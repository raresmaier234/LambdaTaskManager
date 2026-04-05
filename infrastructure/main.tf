module "iam" {
  source = "./modules/iam"

  project_name = var.project_name
  environment  = var.environment
}

module "lambda" {
  source = "./modules/lambda"

  project_name              = var.project_name
  environment               = var.environment
  lambda_execution_role_arn = module.iam.lambda_role
  lambda_handler            = var.lambda_handler
  lambda_runtime            = var.lambda_runtime
}

module "frontend" {
  source = "./modules/frontend"

  project_name = var.project_name
  environment  = var.environment
}