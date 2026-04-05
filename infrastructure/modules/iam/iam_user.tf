resource "aws_iam_user" "lambda_task_cloud_user" {
  name = "${var.project_name}_${var.environment}_user"

  tags = {
    Name = "${var.project_name}_user"
    Environment = var.environment
  }
}

resource "aws_iam_user_policy" "terraform_state_access" {
  name = "${var.project_name}-terraform-state-access"
  user = aws_iam_user.lambda_task_cloud_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::lambda-task-cloud-tf-state-557187998171",
          "arn:aws:s3:::lambda-task-cloud-tf-state-557187998171/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem"
        ]
        Resource = "arn:aws:dynamodb:us-east-2:557187998171:table/terraform-lock"
      }
    ]
  })
}