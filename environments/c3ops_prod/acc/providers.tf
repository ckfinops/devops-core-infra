variable "account_id_mgmt" {
    type = string
}

variable "account_id_preprod" {
    type = string
}

variable "account_id_prod" {
    type = string
}

variable "region" {
    type    = string
    default = "ap-south-1"
}

# Default provider = the account this stack runs in
provider "aws" {
    region = var.region
}

# Assume into Preprod/Prod deploy roles when needed (from mgmt bootstraps)
provider "aws" {
    alias  = "preprod"
    region = var.region

    assume_role {
        role_arn = "arn:aws:iam::${var.account_id_preprod}:role/c3ops-preprod-deploy-role"
    }
}

provider "aws" {
    alias  = "prod"
    region = var.region

    assume_role {
        role_arn = "arn:aws:iam::${var.account_id_prod}:role/c3ops-prod-deploy-role"
    }
}
