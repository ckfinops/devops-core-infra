terraform {
  backend "s3" {
    bucket = "c3ops-iac-terraform"
    key    = "dev/infra/terraform.tfstate"
    region = "ap-south-2"
    #dynamodb_table = "c3ops-preprod-tf-locks"
    encrypt = true
  }
}