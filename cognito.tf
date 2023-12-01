provider "aws" {
  region = "eu-central-1"
}

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
resource "aws_iam_role" "authenticated" {
  name = "CognitoDynamoDBRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "cognito-idp.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_policy" "dynamodb_policy" {
  name        = "dynamodb-policy-full"
  path        = "/"

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [{
            "Action": [
                "dynamodb:*",
                "dax:*",
                "application-autoscaling:DeleteScalingPolicy",
                "application-autoscaling:DeregisterScalableTarget",
                "application-autoscaling:DescribeScalableTargets",
                "application-autoscaling:DescribeScalingActivities",
                "application-autoscaling:DescribeScalingPolicies",
                "application-autoscaling:PutScalingPolicy",
                "application-autoscaling:RegisterScalableTarget",
                "cloudwatch:DeleteAlarms",
                "cloudwatch:DescribeAlarmHistory",
                "cloudwatch:DescribeAlarms",
                "cloudwatch:DescribeAlarmsForMetric",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:ListMetrics",
                "cloudwatch:PutMetricAlarm",
                "cloudwatch:GetMetricData",
                "datapipeline:ActivatePipeline",
                "datapipeline:CreatePipeline",
                "datapipeline:DeletePipeline",
                "datapipeline:DescribeObjects",
                "datapipeline:DescribePipelines",
                "datapipeline:GetPipelineDefinition",
                "datapipeline:ListPipelines",
                "datapipeline:PutPipelineDefinition",
                "datapipeline:QueryObjects",
                "ec2:DescribeVpcs",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
                "iam:GetRole",
                "iam:ListRoles",
                "kms:DescribeKey",
                "kms:ListAliases",
                "sns:CreateTopic",
                "sns:DeleteTopic",
                "sns:ListSubscriptions",
                "sns:ListSubscriptionsByTopic",
                "sns:ListTopics",
                "sns:Subscribe",
                "sns:Unsubscribe",
                "sns:SetTopicAttributes",
                "lambda:CreateFunction",
                "lambda:ListFunctions",
                "lambda:ListEventSourceMappings",
                "lambda:CreateEventSourceMapping",
                "lambda:DeleteEventSourceMapping",
                "lambda:GetFunctionConfiguration",
                "lambda:DeleteFunction",
                "resource-groups:ListGroups",
                "resource-groups:ListGroupResources",
                "resource-groups:GetGroup",
                "resource-groups:GetGroupQuery",
                "resource-groups:DeleteGroup",
                "resource-groups:CreateGroup",
                "tag:GetResources",
                "kinesis:ListStreams",
                "kinesis:DescribeStream",
                "kinesis:DescribeStreamSummary"
            ],
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Action": "cloudwatch:GetInsightRuleReport",
            "Effect": "Allow",
            "Resource": "arn:aws:cloudwatch:*:*:insight-rule/DynamoDBContributorInsights*"
        },
        {
            "Action": [
                "iam:PassRole"
            ],
            "Effect": "Allow",
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "iam:PassedToService": [
                        "application-autoscaling.amazonaws.com",
                        "application-autoscaling.amazonaws.com.cn",
                        "dax.amazonaws.com"
                    ]
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:AWSServiceName": [
                        "replication.dynamodb.amazonaws.com",
                        "dax.amazonaws.com",
                        "dynamodb.application-autoscaling.amazonaws.com",
                        "contributorinsights.dynamodb.amazonaws.com",
                        "kinesisreplication.dynamodb.amazonaws.com"
                    ]
                }
            }
        }
    ]
})
}

resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
  policy_arn = aws_iam_policy.dynamodb_policy.arn
  role       = aws_iam_role.authenticated.name
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
    "authenticated" = aws_iam_role.authenticated.arn
  }
}