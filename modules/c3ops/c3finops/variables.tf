variable "c3finops_name_prefix" {
    default = "c3finops"
}
variable "c3finops_80tg_prefix" {
    default = "80"
}

variable "c3finops_region" {
  default = "ap-south-2"
}

variable "c3finops_web_instance_size" {
}
variable "c3finops_app_instance_size" {
}
variable "c3finops_root_volume_size" {
  default = 10
}
variable "c3finops_resource_name_prepend" {
  default = "c3finops-al2023"
}

variable "c3finops_key_name" {}

variable "c3finops_vpc_id" {}

variable "c3finops_public_subnets" {
  type = list(string)
}
variable "c3finops_private_subnets" {
  type = list(string)
}
variable "c3finops_data_subnets" {
  type = list(string)
}

variable "c3finops_ssl_certificate" { }

variable "c3finops_admin_linux_sg_id" { }

variable "c3finops_exposed_cidrs" {
  type = list(string)
}

variable "c3finops_admin_web_sg_id" {}

variable "c3finops_additional_tags" {
  type    = map(string)
}

variable "c3finops_environment" {}

variable "c3finops_healthcheck_interval" {
  default = 30
}

variable "c3finops_scale_min" {
    default = 1
}
variable "c3finops_scale_max" {
    default = 2
}

#variable "c3finops_ami_id" { }

variable "c3finops_web_ami" { }
variable "c3finops_app_ami" { }


variable "c3finops_version" {
  default = "1.0.0"
}

variable "ec2_policy_for_ssm" {
  description = "EC2 policy for SSM access"
  type        = string
}

variable "c3finops_alb_internal" {
  description = "Set to true for internal ALB, false for public"
  type        = bool
}

variable "c3finops_module_tags" {
  type = map(string)

  default = {
    "APP_NAME"  = "c3finops"
    "APP_ID"	= "0001"
    "SUPPORT_EMAIL" = "support@c3ops.in"
    "BUILD_BY"     = "Terraform"
    "AccountName"  = "C3OPS-preprod"
    "BusinessUnit" = "C3OPS"
    "ManagedBy"    = "Terraform"
    "ContactEmail" = "support@c3ops.in"
    "Application"  = "C3 - Cloud Cost Console FinOps"
    "Environment"  = "dev"
    "CostCenter"   = "0001"
    "Project"      = "C3 - Cloud Cost Console"
    "TECH_STACK_OWNER" = "kesav@c3ops.in"
    "IT_OWNER_EMAIL" = "joel@c3ops.in"
    "FUNC_OWNER_EMAIL" = "jessica@c3ops.in"
  }
}
