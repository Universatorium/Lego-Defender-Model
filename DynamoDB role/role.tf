resource "aws_iam_role" "dynamodb_owner_role" {
  name = "DynamoDBOwnerRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "dynamodb.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "dynamodb_owner_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role       = aws_iam_role.dynamodb_owner_role.name
}

output "dynamodb_owner_role_arn" {
  value = aws_iam_role.dynamodb_owner_role.arn
}

