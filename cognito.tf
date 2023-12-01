provider "aws" {
  region = "eu-central-1"
}

# data "aws_vpc" "vpc" {
#   id = ""
# }

# data "aws_subnet" "subnet" {
#   id = ""
# }

resource "aws_cognito_user_pool" "pool" {
  name = "DefenderAbschlussprojekt"

  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  mfa_configuration        = "OFF"
}

resource "aws_cognito_user_pool_client" "client" {
  name = "Defender"
  user_pool_id = aws_cognito_user_pool.pool.id
  generate_secret = false
}

resource "aws_cognito_user_group" "kunde" {
  name         = "Kunde"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_group" "lager" {
  name         = "Lager"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_group" "konstruktion" {
  name         = "Konstruktion"
  user_pool_id = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_group" "service" {
  name         = "Service"
  user_pool_id = aws_cognito_user_pool.pool.id
}


########################
resource "aws_iam_role" "cognito_dynamodb_role" {
  name = "CognitoDynamoDBRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "cognito.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "dynamodb-policy"
  path        = "/"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
    {
      Effect = "Allow",
      Action = [
        "dynamodb:DescribeTable",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
  policy_arn = aws_iam_policy.dynamodb_policy.arn
  role       = aws_iam_role.cognito_dynamodb_role.name
}

resource "aws_cognito_identity_pool" "identity_pool_mitarbeiter" {
  identity_pool_name = "mitarbeiter-identity-pool"
  allow_unauthenticated_identities = false

  cognito_identity_providers {
    client_id   = aws_cognito_user_pool_client.client.id
    provider_name = aws_cognito_user_pool.pool.endpoint
    server_side_token_check = true
  }
}

resource "aws_cognito_identity_pool_roles_attachment" "id_pool_att" {
  identity_pool_id = aws_cognito_identity_pool.identity_pool_mitarbeiter.id
  roles = {
    "authenticated" = aws_iam_role.cognito_dynamodb_role.arn
  }
}