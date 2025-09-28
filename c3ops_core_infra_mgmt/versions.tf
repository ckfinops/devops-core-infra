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