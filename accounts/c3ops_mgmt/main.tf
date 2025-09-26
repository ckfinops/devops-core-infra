# Terraform versions
terraform {
  required_version = ">= 1.9.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.62" # recent 5.x provider
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
}

# Backend configuration
terraform {
  backend "s3" {
    bucket = "c3ops-iac-terraform" // This is created manually
    key    = "accounts/c3ops_mgmt/terraform.tfstate"
    region = "ap-south-2"
    #dynamodb_table = "c3ops-preprod-tf-locks"
    encrypt = true
  }
}

# Providers
provider "aws" {
  #profile = "default" // To Execute From Local System

  assume_role {
    role_arn = "arn:aws:iam::${var.aws_account_id}:role/c3ops-automation" // Created Manually
  }
  region = var.region
}

