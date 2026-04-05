resource "aws_iam_user" "lambda_task_cloud_user" {
  name = "${var.project_name}_${var.environment}_user"

  tags = {
    Name = "${var.project_name}_user"
    Environment = var.environment
  }
}