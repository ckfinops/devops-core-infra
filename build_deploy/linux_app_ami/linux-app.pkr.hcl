packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

# Define variables
variable "aws_region" {
  default = "ap-south-2"
}
variable "instance_type" {
  default = "t2.micro"
}
variable "ami_name" {
  default = "amz2-packer-c3finops-web-{{timestamp}}"
}
variable "source_ami" {
  default = ""  // Base Image
}
variable "packer_profile" {
    default = "packer-ec2-s3" 
}
variable "application_name" {
    default = "c3finops-web" 
}
variable "application_version" {
    default = "1.0" 
}
variable "iam_profile" {
    default = "automation" 
}
variable "ami_preprod_accounts" {
    default = "" 
}
variable "vpc_id" {
    default = "" 
}
variable "subnet_id" {
    default = "" 
}

# Define AWS provider
source "amazon-ebs" "amz2" {
  region              = var.aws_region
  source_ami         = var.source_ami
  instance_type       = var.instance_type
  iam_instance_profile = var.packer_profile
  ssh_username       = "ec2-user"
  ami_name           = var.ami_name
  ami_description    = "Golden Image of Amazon Linux 2023 with pre-installed packages"
  vpc_id = var.vpc_id
  subnet_id = var.subnet_id
  security_group_id = "sg-658b5613"
  associate_public_ip_address = true
  run_tags = {
    Name = "Packer Build Amazon Linux 2"
    CreatedBy = "Packer"
    IT_OWNER_EMAIL = "kesav.kummari@c3ops.in"
  }
}

# Define provisioning steps
build {
  sources = ["source.amazon-ebs.amz2"]

  provisioner "shell" {
    inline = [
    # Update system and install packages
    "sudo yum update -y",
    "sudo yum install -y vim wget curl unzip python3 python3-pip java-1.7.0-openjdk httpd mod_auth_openidc",

    # Enable and start Apache
    "sudo systemctl enable httpd",
    "sudo systemctl start httpd",

    # Install AWS CLI v2
    "curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'",
    "unzip awscliv2.zip",
    "sudo ./aws/install",
    "rm -rf awscliv2.zip aws/",

    # Install EPEL repository
    "sudo amazon-linux-extras install epel -y",

    # Install Ansible
    "sudo yum install -y ansible",

    # Verify Ansible installation
    "ansible --version",

    "rpm -qa | grep amazon-ssm-agent",
    "amazon-ssm-agent --version",

    # Create a new user
    "sudo useradd appadmin || true",
    "echo 'appadmin ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/appadmin",

    # SMTP Configuration 
    "sudo yum install postfix -y",
    "sudo systemctl restart postfix",
    # "sudo aws s3 cp s3://c3ops/smtp-conf-files/sasl_passwd /etc/postfix/sasl_passwd",
    # "sudo aws s3 cp s3://c3ops/smtp-conf-files/tls_policy /etc/postfix/tls_policy",
    # "sudo aws s3 cp s3://c3ops/smtp-conf-files/main.cf /etc/postfix/main.cf",
    # "sudo aws s3 cp s3://c3ops/smtp-conf-files/generic /etc/postfix/generic",
    "sudo postmap /etc/postfix/sasl_passwd",
    "sudo postmap /etc/postfix/tls_policy",
    "sudo postmap /etc/postfix/main.cf",
    "sudo postmap /etc/postfix/generic",
    "sudo systemctl restart postfix",

    #playbook_file = "ansible/install_play_karaf.yml"

    # Download Ui Code From S3 Bucket - UI Code 
    #"sudo aws s3 cp s3://c3ops/build-c3finops-UI.zip /home/ec2-user/build-c3finops-UI.zip",
    
    # Download Ui Code From S3 Bucket - Services Code 
    #"sudo aws s3 cp s3://c3ops/build-c3finops-services.zip /home/ec2-user/build-c3finops-services.zip",
    #"sudo unzip -o /home/ec2-user/c3finops-UI.zip -d /home/ec2-user/",
    #"sudo unzip -o /home/ec2-user/build-c3finops-UI/abmet-1.0.0-SNAPSHOT.zip -d /var/www/html/",

    # Setup cron job to monitor httpd
    "echo '*/5 * * * * root bash /home/ec2-user/app_s3_file_copy.sh' | sudo tee /etc/cron.d/check_httpd",

    # Restart cron
    "sudo systemctl restart crond"

    ]
  }
}