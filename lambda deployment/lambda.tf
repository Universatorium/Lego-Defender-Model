provider "aws" {
  region = "eu-central-1"  # Region anpassen
}

resource "aws_lambda_function" "example" {
  function_name = "my-lambda-function"
  runtime       = "python3.8"
  handler       = "index.handler"
  filename      = "lambda/lambda_function.zip"
  role          = aws_iam_role.lambda.arn

  source_code_hash = filebase64("lambda/lambda_function.zip")

  environment {
    variables = {
      KEY = "VALUE"
    }
  }
}

resource "aws_iam_role" "lambda" {
  name = "lego-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}
