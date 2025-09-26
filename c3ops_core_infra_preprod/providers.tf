# Providers
provider "aws" {
  profile = "default" // To Execute From Local System

  # assume_role {
  #   role_arn = "arn:aws:iam::${var.aws_account_id}:role/c3ops-automation" // Created Manually
  # }
  region = var.region
}