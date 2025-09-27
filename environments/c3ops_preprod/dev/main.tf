
data "terraform_remote_state" "c3ops_preprod_core_infra" {
  backend = "s3"

  config = {
    bucket  = "c3ops-iac-terraform"
    key     = "accounts/c3ops_preprod/terraform.tfstate"
    region  = "ap-south-2"
    encrypt = true
  }
}

module "c3finops_dev" {
  source = "../../../modules/c3ops/c3finops"

  c3finops_vpc_id                    = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.vpc_id
  c3finops_public_subnets            = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.public_subnet_ids
  c3finops_private_weblayer_subnets  = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.private_weblayer_subnet_ids
  c3finops_private_applayer_subnets  = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.private_applayer_subnet_ids
  c3finops_private_datalayer_subnets = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.private_dblayer_subnet_ids
  c3finops_additional_tags           = var.global_tags
  c3finops_environment               = "dev"
  ec2_policy_for_ssm                 = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  #c3finops_ssl_certificate           = "arn:aws:acm:us-east-1:225989338000:certificate/9ac2df4a-2640-4e82-8e30-21a14259b6e7"
  c3finops_ssl_certificate = "arn:aws:acm:ap-south-2:225989338000:certificate/f00014fe-ce71-452c-99c7-b447ee2115e8"

  c3finops_key_name            = "c3ops-preprod-keypair"
  c3finops_admin_linux_sg_id   = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.linux_admin_security_group_id
  c3finops_admin_windows_sg_id = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.windows_admin_security_group_id
  c3finops_admin_web_sg_id     = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.linux_admin_security_group_id
  c3finops_web_instance_size   = "t3.micro"
  c3finops_app_instance_size   = "t3.micro"
  c3finops_web_ami             = "ami-0be60c8d021e4ffdf"
  c3finops_app_ami             = "ami-0be60c8d021e4ffdf"
  c3finops_exposed_cidrs       = ["0.0.0.0/0"]
  c3finops_alb_internal        = false //Set this as true if you want an Internal ALB, false if you want a Public ALB

  # MYSQL RDS Instance Inputs
  rds_instance_identifier = "rds-mysql"
  rds_allocated_storage   = "20"
  rds_storage_type        = "gp3"
  rds_instance_class      = "db.m5.large"
  rds_subnet_group        = ""
  rds_admin_sg            = ""
  database_mysql_port     = "3306"
  rds_snapshot_identifier = ""

  backup_window           = "03:00-03:30"
  backup_retention_period = "7"
  maintenance_window      = "sat:04:00-sat:05:00"
  rds_is_multi_az         = "false"

  hosted_zone_name = "c3ops.in."
  record_name      = "c3"

}

