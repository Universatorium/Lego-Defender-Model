# IAM-Rolle im Ursprungs-Account
resource "aws_iam_role" "source_account_role" {
  name = "DynamoDBSourceAccountRole"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        AWS = "arn:aws:iam::732509143253:root"
      }
    }]
  })
}

# IAM-Rolle im Ziel-Account
resource "aws_iam_role" "target_account_role" {
  name = "DynamoDBTargetAccountRole"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        AWS = "arn:aws:iam::043412102071:root"
      }
    }]
  })
}
