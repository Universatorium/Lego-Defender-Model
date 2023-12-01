provider "aws" {
  region = "eu-central-1"
}

###################################### Lambda #####################################

# Fügen Sie hier die Ressourcen für die anderen DynamoDB-Tabellen hinzu (mitarbeiter, lager, auftrag, fertigungsliste)

resource "aws_lambda_function" "initialize_dynamodb" {
  filename      = "DbFill.zip"  
  function_name = "InitializeDynamoDB"
  role          = aws_iam_role.lambda.arn
  handler       = "DbFill.lambda_handler"
  runtime       = "python3.8"
}

resource "aws_iam_role" "lambda" {
  name = "lambda_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com",
        },
      },
    ],
  })
}

resource "aws_iam_policy_attachment" "lambda_exec_policy" {
  name = "Lambda-exec"
  policy_arn = aws_iam_policy.lambda_policy.arn
  roles      = [aws_iam_role.lambda.name]
}

resource "aws_iam_policy" "lambda_policy" {
  name = "lambda-policy"

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:*",
                "sqs:*",
                "sns:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:CreateLogGroup",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:::*"
        }
    ]
})
}

resource "aws_lambda_permission" "allow_dynamodb" {
  statement_id  = "AllowExecutionFromDynamoDB"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.kunde.arn  # Hier müssen die ARN für DynamoDB-Tabelle angeben
}

resource "aws_lambda_permission" "allow_dynamodb_kunde" {
  statement_id  = "AllowExecutionFromDynamoDBKunde"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.kunde.arn
}

resource "aws_lambda_permission" "allow_dynamodb_mitarbeiter" {
  statement_id  = "AllowExecutionFromDynamoDBMitarbeiter"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.mitarbeiter.arn
}

resource "aws_lambda_permission" "allow_dynamodb_lager" {
  statement_id  = "AllowExecutionFromDynamoDBLager"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.lager.arn
}

resource "aws_lambda_permission" "allow_dynamodb_auftrag" {
  statement_id  = "AllowExecutionFromDynamoDBAuftrag"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.auftrag.arn
}

resource "aws_lambda_permission" "allow_dynamodb_fertigungsliste" {
  statement_id  = "AllowExecutionFromDynamoDBFertigungsliste"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.initialize_dynamodb.function_name
  principal     = "dynamodb.amazonaws.com"
  source_arn    = aws_dynamodb_table.fertigungsliste.arn
}



############################## DynamoDB ####################################

resource "aws_dynamodb_table" "kunde" {
  name           = "Kunde"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Kunde"

  attribute {
    name = "ID_Kunde"
    type = "N"
  }
}

resource "aws_dynamodb_table" "mitarbeiter" {
  name           = "Mitarbeiter"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Mitarbeiter"

  attribute {
    name = "ID_Mitarbeiter"
    type = "N"
  }

}

resource "aws_dynamodb_table" "lager" {
  name           = "Lager"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Lager"

  attribute {
    name = "ID_Lager"
    type = "N"
  }
}

resource "aws_dynamodb_table" "auftrag" {
  name           = "Auftrag"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Auftrag"

  attribute {
    name = "ID_Auftrag"
    type = "N"
  }
}

resource "aws_dynamodb_table" "fertigungsliste" {
  name           = "Fertigungsliste"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Fertigungsliste"

  attribute {
    name = "ID_Fertigungsliste"
    type = "N"
  }
}

resource "aws_dynamodb_table" "produkte" {
  name           = "Produkte"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Produkt"

  attribute {
    name = "ID_Produkt"
    type = "N"
  }
}

resource "aws_dynamodb_table" "Konfiguration" {
  name           = "Konfiguration"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID_Konfiguration"

  attribute {
    name = "ID_Konfiguration"
    type = "N"
  }
}


########################### local exec ####################
resource "null_resource" "invoke_lambda" {
  depends_on = [
    aws_dynamodb_table.kunde,
    aws_dynamodb_table.mitarbeiter,
    aws_dynamodb_table.lager,
    aws_dynamodb_table.auftrag,
    aws_dynamodb_table.fertigungsliste,
    aws_lambda_function.initialize_dynamodb,
    aws_iam_role.lambda
  ]

  provisioner "local-exec" {
    command = "aws lambda invoke --function-name InitializeDynamoDB output.txt --region eu-central-1"
  }
}