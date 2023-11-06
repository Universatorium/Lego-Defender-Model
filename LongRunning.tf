###############################################################################

#VPC
resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16"
}

#IGW
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "internet_gateway"
  }
}

#Route for Table
resource "aws_route" "public_route" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}


# Routen-Tabelle-Zuordnung für Subnetz 1A
resource "aws_route_table_association" "public_route_table_association_1a" {
  subnet_id      = aws_subnet.public_subnet1a.id
  route_table_id = aws_route_table.public_route_table.id
}

# Routen-Tabelle-Zuordnung für Subnetz 1B
resource "aws_route_table_association" "public_route_table_association_1b" {
  subnet_id      = aws_subnet.public_subnet1b.id
  route_table_id = aws_route_table.public_route_table.id
}



#Route Table
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "public_route_table"
  }
}

#Subnetz
resource "aws_subnet" "public_subnet1a" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "eu-central-1a" 
  map_public_ip_on_launch = true  # Enable public IP assignment
  tags = {
    Name = "public_subnet1a"
  }
}

resource "aws_subnet" "private_subnet1a" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "eu-central-1a"  
  tags = {
    Name = "private_subnet1a"
  }
}


resource "aws_subnet" "public_subnet1b" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.3.0/24"
  availability_zone = "eu-central-1b" 
  map_public_ip_on_launch = true  # Enable public IP assignment
  tags = {
    Name = "public_subnet1b"
  }
}

resource "aws_subnet" "private_subnet1b" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.4.0/24"
  availability_zone = "eu-central-1b" 
  tags = {
    Name = "private_subnet1b"
  }
}

#Route Table für Private Subnetze
resource "aws_route_table" "private_route_table1a" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = "private_route_table1a"
  }
}

resource "aws_route_table_association" "private_subnet1a" {
  subnet_id      = aws_subnet.private_subnet1a.id
  route_table_id = aws_route_table.private_route_table1a.id
}

resource "aws_route_table" "private_route_table1b" {
  vpc_id = aws_vpc.my_vpc.id
  tags = {
    Name = "private_route_table1b"
  }
}

resource "aws_route_table_association" "private_subnet1b" {
  subnet_id      = aws_subnet.private_subnet1b.id
  route_table_id = aws_route_table.private_route_table1b.id
}


################################ S3 #################################

resource "aws_s3_bucket" "LegoBuilder" {
  bucket = "lego-defender-model" 

  aws_s3_bucket_versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_policy" "onlyAndyWR" {
  bucket = aws_s3_bucket.LegoBuilder.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "s3:GetObject",
        Effect = "Allow",
        Resource = aws_s3_bucket.LegoBuilder.arn,
        Principal = "*",
      },
      {
        Action = "s3:PutObject",
        Effect = "Allow",
        Resource = "${aws_s3_bucket.LegoBuilder.arn}/*",
        Principal = "arn:aws:iam::732509143253:root" 
      },
      {
        Action = "s3:PutObject",
        Effect = "Allow",
        Resource = "${aws_s3_bucket.LegoBuilder.arn}/*",
        Principal = "arn:aws:iam::OTHER_ACCOUNT_ID:root" # Ersetzen Sie OTHER_ACCOUNT_ID durch die AWS-Konto-ID des anderen erlaubten Kontos
      },
    ],
  })
}


############################## DynamoDB ####################################

resource "aws_dynamodb_table" "kunde" {
  name           = "Kunde"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID-Kunde"

  attribute {
    name = "ID-Kunde"
    type = "N"
  }
}

resource "aws_dynamodb_table" "mitarbeiter" {
  name           = "Mitarbeiter"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID-Mitarbeiter"

  attribute {
    name = "ID-Mitarbeiter"
    type = "N"
  }

}

resource "aws_dynamodb_table" "lager" {
  name           = "Lager"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID-Lager"

  attribute {
    name = "ID-Lager"
    type = "N"
  }
}

resource "aws_dynamodb_table" "auftrag" {
  name           = "Auftrag"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID-Auftrag"

  attribute {
    name = "ID-Auftrag"
    type = "N"
  }
}

resource "aws_dynamodb_table" "fertigungsliste" {
  name           = "Fertigungsliste"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ID-Fertigungsliste"

  attribute {
    name = "ID-Fertigungsliste"
    type = "N"
  }
}

############################ Dummy Daten für Tabelle Kunde #################################
resource "aws_dynamodb_table_item" "kunde_data" {
  table_name = aws_dynamodb_table.kunde.name
  hash_key   = "ID-Kunde"

  item = <<ITEM
{
  "ID-Kunde": {"N": "1"},
  "Email": {"S": "max.mustermann@example.com"},
  "Vorname": {"S": "Max"},
  "Nachname": {"S": "Mustermann"},
  "Telefon": {"S": "+1234567890"},
  "Adresse": {"S": "Musterstraße 123, Musterstadt"},
  "Auftrag": {"S": "Auftrag123"},
  "angezeigte Konfiguration": {"S": "Konfiguration123"}
}
ITEM
}

############################ Dummy Daten für Tabelle Mitarbeiter #################################
resource "aws_dynamodb_table_item" "mitarbeiter_data" {
  table_name = aws_dynamodb_table.mitarbeiter.name
  hash_key   = "ID-Mitarbeiter"

  item = <<ITEM
{
  "ID-Mitarbeiter": {"N": "1"},
  "Email": {"S": "mitarbeiter1@example.com"},
  "Vorname": {"S": "Mitarbeiter1Vorname"},
  "Nachname": {"S": "Mitarbeiter1Nachname"},
  "Rolle": {"S": "Rolle1"}
}
ITEM
}

############################ Dummy Daten für Tabelle Lager #################################
resource "aws_dynamodb_table_item" "lager_data" {
  table_name = aws_dynamodb_table.lager.name
  hash_key   = "ID-Lager"

  item = <<ITEM
{
  "ID-Lager": {"N": "1"},
  "Name": {"S": "Lager1"},
  "Beschreibung": {"S": "Beschreibung1"},
  "S3 BildURL": {"S": "URL1"},
  "Anzahl": {"N": "100"},
  "Farbe": {"S": "Farbe1"},
  "Preis": {"N": "10.99"}
}
ITEM
}

############################ Dummy Daten für Tabelle Auftrag #################################
resource "aws_dynamodb_table_item" "auftrag_data" {
  table_name = aws_dynamodb_table.auftrag.name
  hash_key   = "ID-Auftrag"

  item = <<ITEM
{
  "ID-Auftrag": {"N": "1"},
  "ID-Kunde": {"N": "1"},
  "Konfiguration": {"S": "Konfiguration1"},
  "Bestelldatum": {"S": "2023-11-06"},
  "Gesamtpreis": {"N": "99.99"}
}
ITEM
}

############################ Dummy Daten für Tabelle Fertigungsliste #################################
resource "aws_dynamodb_table_item" "fertigungsliste_data" {
  table_name = aws_dynamodb_table.fertigungsliste.name
  hash_key   = "ID-Fertigungsliste"

  item = <<ITEM
{
  "ID-Fertigungsliste": {"N": "1"},
  "ID-Auftrag": {"N": "1"},
  "Konfigurations Liste Detailiert": {"S": "DetailierteKonfiguration1"}
}
ITEM
}



