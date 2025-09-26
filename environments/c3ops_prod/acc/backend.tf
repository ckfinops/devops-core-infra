terraform {
  backend "s3" {
    bucket         = "c3ops-preprod-tfstate"
    key            = "dev/infra/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "c3ops-preprod-tf-locks"
    encrypt        = true
  }
}