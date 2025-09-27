variable "rds_admin_sg" {
  description = "The security group ID for RDS admin access."
  type        = string
}
variable "rds_instance_identifier" {
  description = "The identifier for the RDS instance."
  type        = string
}
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
  default = "c3finops"
}

variable "c3finops_key_name" {}

variable "c3finops_vpc_id" {}

variable "c3finops_public_subnets" {
  type = list(string)
}
variable "c3finops_private_weblayer_subnets" {
  type = list(string)
}
variable "c3finops_private_applayer_subnets" {
  type = list(string)
}
variable "c3finops_private_datalayer_subnets" {
  type = list(string)
}

variable "c3finops_ssl_certificate" { }

variable "c3finops_admin_linux_sg_id" { }
variable "c3finops_admin_windows_sg_id" { }

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

variable "rds_allocated_storage" {
  description = "The allocated storage in GBs"
  default     = "20 GB"
  # You just give it the number, e.g. 10
}

variable "rds_engine_type" {
  description = "Database engine type"
  default     = "mysql"

  # Valid types are
  # - mysql
  # - postgres
  # - oracle-*
  # - sqlserver-*
  # See http://docs.aws.amazon.com/cli/latest/reference/rds/create-db-instance.html
  # --engine
}

variable "rds_engine_version" {
  description = "Database engine version, depends on engine type"
  default     = "8.0.42"

  # For valid engine versions, see:
  # See http://docs.aws.amazon.com/cli/latest/reference/rds/create-db-instance.html
  # --engine-version
}

variable "rds_instance_class" {
  description = "Class of RDS instance"

  # Valid values
  # https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html
}
# Self-explainatory variables
variable "database_user" {
  default     = "c3finopsadmin"
}

variable "database_password" {
  default     = "C3FinOps$%2025"
}
variable "database_mysql_port" {
  default     = "3306"
}

variable "rds_snapshot_identifier" {
  description = "The snapshot to restore the rds instance"
}
# variable "rds_admin_sg" {
#   description = "The admin rds security group"
# }
variable "rds_subnet_group" {
  description = "The rds subnet group"
}
variable "rds_is_multi_az" {
  description = "Set to true on production"
  default     = false
}
variable "rds_storage_type" {
  description = "One of 'standard' (magnetic), 'gp2' (general purpose SSD), or 'io1' (provisioned IOPS SSD)."
  default     = "standard"
}
variable "rds_iops" {
  description = "The amount of provisioned IOPS. Setting this implies a storage_type of 'io1', default is 0 if rds storage type is not io1"
  default     = "0"
}
variable "publicly_accessible" {
  description = "Determines if database can be publicly available (NOT recommended)"
  default     = true
}
variable "auto_minor_version_upgrade" {
  description = "Allow automated minor version upgrade"
  default     = false
}

variable "allow_major_version_upgrade" {
  description = "Allow major version upgrade"
  default     = false
}

variable "apply_immediately" {
  description = "Specifies whether any database modifications are applied immediately, or during the next maintenance window"
  default     = false
}

variable "maintenance_window" {
  description = "The window to perform maintenance in. Syntax: 'ddd:hh24:mi-ddd:hh24:mi' UTC "
  default     = "Mon:03:00-Mon:04:00"
}
variable "skip_final_snapshot" {
  description = "If true (default), no snapshot will be made before deleting DB"
  default     = true
}

variable "copy_tags_to_snapshot" {
  description = "Copy tags from DB to a snapshot"
  default     = true
}

variable "backup_window" {
  description = "When AWS can run snapshot, can't overlap with maintenance window"
  default     = "22:00-03:00"
}

variable "backup_retention_period" {
  type        = string
  description = "How long will we retain backups"
  default     = 0
}

variable "tags" {
  description = "A map of tags to add to all resources"
  default     = {}
}

variable "hosted_zone_name" { 
  type = string 
  default = "c3ops.in."
  }         
variable "record_name" { 
  type = string 
  default = "c3.c3ops.in"
  
  }        # e.g., "app" or "app.c3ops.in"


# variables.tf (example)
variable "region" {
  type = string
  default = "ap-south-2"
}

variable "ui_bucket" {
  type = string
  default = "c3ops.in"
}

variable "ui_key" {
  type = string
  default = "c3ops.zip"
}

variable "api_bucket" {
  type = string
  default = "c3ops.in"

}

variable "api_key" {
  type = string
  default = "c3ops-10.0.0.war"
}

variable "tomcat_version" {
  type    = string
  default = "10.1.29"
}

