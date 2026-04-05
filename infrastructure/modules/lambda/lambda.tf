# Lambda layer (dependencies)
data "archive_file" "lambda_layer" {
  type        = "zip"
  source_dir  = "${path.module}/../../../backend/lambda_tasks/layer"
  output_path = "${path.module}/../../../lambda_layer.zip"
}

# Application code only (excludes layer + caches — those go in the Lambda layer)
data "archive_file" "lambda_package" {
  type        = "zip"
  source_dir  = "${path.module}/../../../backend/lambda_tasks"
  output_path = "${path.module}/../../../lambda_package.zip"
  excludes = [
    "layer",
    "__pycache__",
    "requirements.txt",
    ".DS_Store",
  ]
}


resource "aws_lambda_layer_version" "dependencies" {
  layer_name          = "${var.project_name}_${var.environment}_dependencies"
  filename            = data.archive_file.lambda_layer.output_path
  source_code_hash    = data.archive_file.lambda_layer.output_base64sha256
  compatible_runtimes = [var.lambda_runtime]
}

resource "aws_lambda_function" "lambda_function" {
  function_name = "${var.project_name}_${var.environment}_lambda"
  role          = var.lambda_execution_role_arn
  handler       = var.lambda_handler
  runtime       = var.lambda_runtime
  timeout       = 30
  memory_size   = 512

  filename         = data.archive_file.lambda_package.output_path
  source_code_hash = data.archive_file.lambda_package.output_base64sha256

  layers = [aws_lambda_layer_version.dependencies.arn]

  environment {
    variables = {
      ENVIRONMENT = var.environment
    }
  }

  tags = {
    Name        = "${var.project_name}_lambda"
    Environment = var.environment
  }
}


# API Gateway HTTP API (simpler and cheaper than REST API)
resource "aws_apigatewayv2_api" "lambda_api" {
  name          = "${var.project_name}_${var.environment}_api"
  protocol_type = "HTTP"
  description   = "HTTP API Gateway for Lambda Function"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
    allow_headers = ["*"]
    max_age       = 300
  }
}

# API Gateway Integration with Lambda
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.lambda_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.lambda_function.invoke_arn
  integration_method = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.lambda_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# Also add a root route
resource "aws_apigatewayv2_route" "lambda_root_route" {
  api_id    = aws_apigatewayv2_api.lambda_api.id
  route_key = "ANY /"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}
# API Gateway Stage
resource "aws_apigatewayv2_stage" "lambda_stage" {
  api_id      = aws_apigatewayv2_api.lambda_api.id
  name        = "$default"
  auto_deploy = true

  tags = {
    Name        = "${var.project_name}_stage"
    Environment = var.environment
  }
}

# Lambda Permission for API Gateway to invoke Lambda
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.lambda_api.execution_arn}/*/*"
}

