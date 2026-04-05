output "s3_bucket_name" {
  value       = aws_s3_bucket.frontend.bucket
  description = "Name of the S3 bucket hosting the frontend"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.frontend.id
  description = "ID of the CloudFront distribution"
}

output "cloudfront_url" {
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
  description = "CloudFront distribution URL"
}
