
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

  c3finops_vpc_id            = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.vpc_id
  c3finops_public_subnets    = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.vpc_public_subnets
  c3finops_private_subnets   = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.vpc_private_subnets
  c3finops_data_subnets      = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.vpc_data_subnets
  c3finops_additional_tags   = var.global_tags
  c3finops_environment       = "dev"
  ec2_policy_for_ssm         = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  c3finops_ssl_certificate   = "arn:aws:acm:us-east-1:225989338000:certificate/9ac2df4a-2640-4e82-8e30-21a14259b6e7"
  c3finops_key_name          = "c3ops_preprod_keypair"
  c3finops_admin_linux_sg_id = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.admin_linux_sg_id
  c3finops_admin_web_sg_id   = data.terraform_remote_state.c3ops_preprod_core_infra.outputs.admin_web_sg_id
  c3finops_web_instance_size = "t2.micro"
  c3finops_app_instance_size = "t2.micro"
  c3finops_web_ami           = "ami-0be60c8d021e4ffdf"
  c3finops_app_ami           = "ami-0be60c8d021e4ffdf"
  c3finops_exposed_cidrs     = ["10.0.0.0/16"]
  c3finops_alb_internal      = false //Set this as true if you want an Internal ALB, false if you want a Public ALB
}

