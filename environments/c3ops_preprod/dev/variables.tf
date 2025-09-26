variable "region" {
  default = "ap-south-2"
}

variable "aws_account_id" {
  default = "225989338000"
}

variable "environment" {
  default = "c3ops-preprod"
}

variable "global_tags" {
  type = map(string)

  default = {
    "AccountName"      = "C3OPS-preprod"
    "BusinessUnit"     = "C3OPS"
    "ManagedBy"        = "Terraform"
    "ContactEmail"     = "support@c3ops.in"
    "Application"      = "C3 - Cloud Cost Console FinOps"
    "Environment"      = "dev"
    "CostCenter"       = "0001"
    "Project"          = "C3OPS-preprod"
    "APP_ID"           = "0001"
    "TECH_STACK_OWNER" = "kesav@c3ops.in"
    "IT_OWNER_EMAIL"   = "joel@c3ops.in"
    "FUNC_OWNER_EMAIL" = "jessica@c3ops.in"
  }
}

variable "c3finops_key_name" {
  default = "c3ops_preprod_keypair"
}
