packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.2.6"
    }
  }
}

variable "aws_region"            { default = "ap-south-2" }
variable "instance_type"         { default = "t3.large" }
variable "ami_name"              { default = "win2022-c3finops-web-runtime-{{timestamp}}" }
variable "vpc_id"                { default = "" }
variable "subnet_id"             { default = "" }
variable "security_group_ids"    { type = list(string), default = [] }
variable "iam_instance_profile"  { default = "packer-ec2-s3" }
variable "application_name"      { default = "c3finops-web" }
variable "application_version"   { default = "1.0.0" }
variable "share_account_ids_csv" { default = "" }

# Enable WinRM over HTTPs via user_data
locals {
  user_data_winrm = <<-EOF
    <powershell>
      Set-ExecutionPolicy Bypass -Scope Process -Force
      winrm quickconfig -q
      winrm set winrm/config/winrs '@{MaxMemoryPerShellMB="1024"}'
      winrm set winrm/config '@{MaxTimeoutms="1800000"}'
      winrm set winrm/config/service '@{AllowUnencrypted="true"}'
      winrm set winrm/config/service/auth '@{Basic="true"}'
      netsh advfirewall firewall add rule name="WinRM 5985" dir=in action=allow protocol=TCP localport=5985
    </powershell>
  EOF
}

source "amazon-ebs" "win2022" {
  region                = var.aws_region
  instance_type         = var.instance_type
  iam_instance_profile  = var.iam_instance_profile
  communicator          = "winrm"
  winrm_username        = "Administrator"
  winrm_insecure        = true
  winrm_use_ssl         = false
  user_data             = local.user_data_winrm

  vpc_id                = var.vpc_id
  subnet_id             = var.subnet_id
  security_group_ids    = var.security_group_ids
  associate_public_ip_address = false

  # Latest Windows Server 2022 English AMI
  source_ami_filter {
    filters = {
      name                = "Windows_Server-2022-English-Full-Base-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    owners      = ["801119661308"] # Amazon Windows
    most_recent = true
  }

  ami_name        = var.ami_name
  ami_description = "C3Ops Windows 2022 Golden Runtime AMI (IIS, SSM, AWS CLI, OpenJDK)"
  ebs_optimized   = true
  ena_support     = true

  launch_block_device_mappings {
    device_name          = "xvda"
    volume_type          = "gp3"
    volume_size          = 60
    delete_on_termination = true
    iops = 3000
    throughput = 125
  }

  tags = {
    Name                = var.ami_name
    Application         = var.application_name
    ApplicationVersion  = var.application_version
    Environment         = "golden"
    OwnerEmail          = "kesav.kummari@c3ops.in"
    ManagedBy           = "Packer"
    OS                  = "Windows-2022"
  }
}

build {
  sources = ["source.amazon-ebs.win2022"]

  # Copy your PowerShell scripts and (reference) Ansible playbooks
  provisioner "file" {
    source      = "win-scripts/"
    destination = "C:/Temp/win-scripts"
  }

  provisioner "file" {
    source      = "ansible/"
    destination = "C:/Temp/ansible"
  }

  # Install runtime prerequisites
  provisioner "powershell" {
    inline = [
      "Set-ExecutionPolicy Bypass -Scope Process -Force",

      # Install Chocolatey for package management
      "if (!(Test-Path C:\\ProgramData\\chocolatey)) { Set-ExecutionPolicy Bypass -Scope Process -Force; " +
      " [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; " +
      " iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')) }",

      # Core tools
      "choco install -y awscli",
      "choco install -y git",
      "choco install -y 7zip",

      # OpenJDK LTS for Java/Tomcat workloads (adjust if you use .NET only)
      "choco install -y temurin17",  # or temurin21

      # IIS for web tier (enable features)
      "Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole -All -NoRestart",
      "Enable-WindowsOptionalFeature -Online -FeatureName IIS-ManagementConsole -All -NoRestart",

      # .NET Hosting Bundle if you host ASP.NET Core apps
      "choco install -y dotnet-hosting",
      
      # Ensure SSM agent is running (preinstalled on AWS Windows AMIs)
      "Start-Service AmazonSSMAgent; Set-Service AmazonSSMAgent -StartupType Automatic",

      # Create standard folders
      "New-Item -ItemType Directory -Force -Path C:\\Ops\\scripts | Out-Null",
      "New-Item -ItemType Directory -Force -Path C:\\Ops\\ansible | Out-Null",
      "Copy-Item -Path C:\\Temp\\win-scripts\\* -Destination C:\\Ops\\scripts -Recurse -Force -ErrorAction SilentlyContinue",
      "Copy-Item -Path C:\\Temp\\ansible\\* -Destination C:\\Ops\\ansible -Recurse -Force -ErrorAction SilentlyContinue",

      # Basic IIS default page (optional)
      "Set-Content -Path 'C:\\inetpub\\wwwroot\\health.html' -Value '<html><body><h3>OK</h3></body></html>'",

      # Cleanup
      "Remove-Item -Recurse -Force C:\\Temp\\win-scripts -ErrorAction SilentlyContinue",
      "Remove-Item -Recurse -Force C:\\Temp\\ansible -ErrorAction SilentlyContinue",
    ]
  }

  # Windows sysprep/cleanup is handled by the AWS EC2Launch v2 on Win 2022 at stop
}