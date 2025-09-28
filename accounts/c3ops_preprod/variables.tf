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
  default     = "c3ops-preprod"
}

variable "s3_bucket_name" {
  description = "S3 bucket name for CloudTrail logs"
  type        = string
  default     = "c3ops-preprod-cloudtrail-logs"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {
    "AccountName"  = "C3OPS-preprod"
    "BusinessUnit" = "C3OPS"
    "ManagedBy"    = "Terraform"
    "ContactEmail" = "support@c3ops.in"
    "Environment"  = "preprod"
    "TECH_STACK_OWNER" = "kesav@c3ops.in"
  }
}

