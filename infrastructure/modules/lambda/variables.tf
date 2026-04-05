variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "lambda_runtime" {
    description = "Runtime environment for the Lambda function (e.g., nodejs14.x, python3.8)"
    type        = string
}


variable "lambda_handler" {
    description = "The function within your code that Lambda calls to begin execution (e.g., index.handler)"
    type        = string
}

variable "lambda_execution_role_arn" {
    description = "ARN of the IAM role that Lambda assumes when it executes your function"
    type        = string
}