output "lambda_function_arn" {
  value = aws_lambda_function.lambda_function.arn
}

output "lambda_function_name" {
  value = aws_lambda_function.lambda_function.function_name
}

output "lambda_execution_role_arn" {
  value = var.lambda_execution_role_arn
}

output "lambda_handler" {
  value =  var.lambda_handler
}

output "lambda_runtime" {
  value = var.lambda_runtime
}

output "api_gateway_url" {
  value       = aws_apigatewayv2_stage.lambda_stage.invoke_url
  description = "API Gateway invocation URL"
}

output "api_gateway_id" {
  value       = aws_apigatewayv2_api.lambda_api.id
  description = "API Gateway ID"
}
