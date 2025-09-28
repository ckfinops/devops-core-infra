packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.2.6"
    }
  }
}

variable "aws_region" {
  default = "ap-south-2"
}

variable "instance_type" {
  default = "t3.small" # t3.small is faster than t2.micro for baking
}

variable "ami_name" {
  default = "al2023-c3ops-runtime-{{timestamp}}"
}

variable "vpc_id" {
  default = "vpc-0305c51d2febe0d64"
}

variable "subnet_id" {
  default = "subnet-0ab7ef12823c1b8c3" # private subnet with NAT is recommended
}

variable "security_group_ids" {
  type    = list(string)
  default = ["sg-08cf4cea70d7c2508"]
}

variable "iam_instance_profile" {
  default = "packer-ec2-s3"
}

variable "application_name" {
  default = "c3ops-linux"
}

variable "application_version" {
  default = "1.0.0"
}

variable "share_account_ids_csv" {
  default = "225989338000" # e.g. "111122223333,444455556666"
}

variable "arch" {
  default = "x86_64" # or "arm64"
}

source "amazon-ebs" "al2023" {
  region                      = var.aws_region
  instance_type               = var.instance_type
  iam_instance_profile        = var.iam_instance_profile
  ssh_username                = "ec2-user"
  vpc_id                      = var.vpc_id
  subnet_id                   = var.subnet_id
  security_group_ids          = var.security_group_ids
  associate_public_ip_address = false

  # Discover latest Amazon Linux 2023 AMI
  source_ami_filter {
    filters = {
      name                = "al2023-ami-*-kernel-6.1-*-${var.arch}"
      architecture        = var.arch
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    owners      = ["225989338000"] # Amazon
    most_recent = true
  }

  ami_name        = var.ami_name
  ami_description = "C3Ops Golden Runtime AMI (AL2023) with httpd, Corretto, SSM & CW agents"
  ena_support     = true
  ebs_optimized   = true

  # Harden IMDS
  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  # Root volume settings
  launch_block_device_mappings {
    device_name           = "/dev/xvda"
    volume_type           = "gp3"
    volume_size           = 20
    delete_on_termination = true
    iops                  = 3000
    throughput            = 125
  }

  tags = {
    Name               = var.ami_name
    Application        = var.application_name
    ApplicationVersion = var.application_version
    Environment        = "golden"
    OwnerEmail         = "kesav.kummari@c3ops.in"
    ManagedBy          = "Packer"
  }
}

build {
  sources = ["source.amazon-ebs.al2023"]

  # Copy in your scripts and Ansible playbooks (directory layout in repo)
  provisioner "file" {
    source      = "scripts/"
    destination = "/tmp/scripts"
  }

  provisioner "file" {
    source      = "ansible/"
    destination = "/tmp/ansible"
  }

  provisioner "shell" {
    inline = [
      "set -euo pipefail",
      "sudo dnf -y update",
      # base utilities
      "sudo dnf -y install unzip jq curl tar vim wget bind-utils",
      # Web runtime (install only if this AMI is for web tier)
      "sudo dnf -y install httpd",
      "sudo systemctl enable httpd",
      # Java runtime (prefer LTS)
      "sudo dnf -y install java-21-amazon-corretto",
      # SSM (preinstalled on AL2023) – ensure running
      "sudo systemctl enable amazon-ssm-agent --now || true",
      # CloudWatch Agent
      "sudo dnf -y install amazon-cloudwatch-agent",
      "sudo systemctl enable amazon-cloudwatch-agent || true",

      # Optionally OIDC module (only if you really need it; EPEL on AL2023 ships it)
      "sudo dnf -y install mod_auth_openidc || true",

      # Ansible (controller usually runs elsewhere; if you need it in image use ansible-core)
      "sudo dnf -y install ansible-core",

      # Place your scripts & playbooks
      "sudo mkdir -p /opt/app/scripts /opt/app/ansible",
      "sudo cp -a /tmp/scripts/. /opt/app/scripts/ || true",
      "sudo cp -a /tmp/ansible/. /opt/app/ansible/ || true",
      "sudo chown -R root:root /opt/app && sudo chmod -R 0755 /opt/app",

      # Clean up package caches
      "sudo dnf clean all",
      "sudo rm -rf /var/cache/dnf/* /tmp/*",
    ]
  }

  # (Optional) share AMI to other accounts
  post-processor "shell-local" {
    inline = [
      "if [ -n \"${var.share_account_ids_csv}\" ]; then echo \"Will share AMI after build…\"; fi"
    ]
  }
}