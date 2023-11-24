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