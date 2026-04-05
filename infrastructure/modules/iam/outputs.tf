output "lambda_role" {
  value = aws_iam_role.lambda_role.arn
}

output "lambda_instance_profile_name" {
  value = aws_iam_instance_profile.lambda_profile.name
}

output "lambda_task_cloud_user" {
  value = aws_iam_user.lambda_task_cloud_user.name
}
