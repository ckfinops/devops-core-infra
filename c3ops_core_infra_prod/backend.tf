# Backend configuration
terraform {
  backend "s3" {
    bucket  = "c3ops-iac-terraform" // This is created manually
    key     = "accounts/c3ops_prod/terraform.tfstate"
    region  = "ap-south-2"
    encrypt = true
  }
}