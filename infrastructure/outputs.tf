output "iam_role_arn" {
  value       = module.iam.lambda_role
  description = "ARN of the Lambda execution role"
}

output "lambda_task_cloud_user" {
  value       = module.iam.lambda_task_cloud_user
  description = "Name of the IAM user"
}

output "lambda_function_arn" {
  value       = module.lambda.lambda_function_arn
  description = "ARN of the Lambda function"
}

output "api_gateway_url" {
  value       = module.lambda.api_gateway_url
  description = "URL of the API Gateway"
}
