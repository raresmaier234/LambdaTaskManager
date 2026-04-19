variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

variable "lambda_handler" {
  description = "Lambda function handler"
  type        = string
}

variable "lambda_runtime" {
  description = "Lambda runtime"
  type        = string
}

