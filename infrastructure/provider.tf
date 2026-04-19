terraform {
  required_version = ">= 1.0.0"

  backend "s3" {
    bucket         = "lambda-task-cloud-tf-state-557187998171"
    key            = "lambda-task-cloud/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "lambda-task-cloud-tf-state-lock"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.region
}

