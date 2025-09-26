variable "keypair_public_key" {
  description = "Public key material for the key pair. Should be in OpenSSH format."
  type        = string
  default     = "c3ops_preprod_keypair.pub"
}
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
  default     = "c3ops-iac-terraform"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default = {

    "AccountName"  = "C3OPS-preprod"
    "BusinessUnit" = "C3OPS"
    "ManagedBy"    = "Terraform"
    "ContactEmail" = "support@c3ops.in"
    # "Application"  = "C3 - Cloud Cost Console FinOps"
    # "Environment"  = "dev"
    # "CostCenter"   = "0001"
    # "Project"      = "C3OPS-preprod"
    # "APP_ID"	= "0001"
    # "TECH_STACK_OWNER" = "kesav@c3ops.in"
    # "IT_OWNER_EMAIL" = "joel@c3ops.in"
    # "FUNC_OWNER_EMAIL" = "jessica@c3ops.in"
  }
}

variable "vpc_env" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "preprod"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "c3ops-preprod"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "bastion_allowed_cidr_blocks" {
  description = "List of CIDR blocks allowed to access the bastion host"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Restrict this in production
}

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-2a"
}

variable "map_public_ip_on_launch" {
  description = "Enable Public ip on EC2"
  type        = bool # bool → true or false
  default     = true
}

variable "availability_zones" {
  description = "List of availability zones to use"
  type        = list(string)
  default     = ["ap-south-2a", "ap-south-2b"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/28", "10.0.2.0/28"]
}

variable "private_web_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "private_app_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.5.0/24", "10.0.6.0/24"]
}

variable "private_db_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.7.0/24", "10.0.8.0/24"]
}


