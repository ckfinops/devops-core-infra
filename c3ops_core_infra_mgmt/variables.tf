
variable "aws_account_id" {
  description = "AWS Account ID for assume role"
  type        = string
  default     = "225989338000"
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-2"
}

variable "prefix" {
  description = "Prefix for resource naming"
  type        = string
  default     = "c3ops-mgmt"
}

variable "s3_bucket_name" {
  description = "S3 bucket name for CloudTrail logs"
  type        = string
  default     = "c3ops-iac-terraform"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {

    "AccountName"  = "C3OPS-Mgmt"
    "BusinessUnit" = "C3OPS"
    "ManagedBy"    = "Terraform"
    "ContactEmail" = "support@c3ops.in"
  }
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "c3ops-mgmt"
}

variable "root_account_id" {
  description = "AWS Root Account ID"
  type        = string
  default     = "225989338000"

}

variable "preprod_account_id" {
  description = "AWS Preprod Account ID"
  type        = string
  default     = "225989338000"

}

variable "prod_account_id" {
  description = "AWS Prod Account ID"
  type        = string
  default     = "225989338000"

}
