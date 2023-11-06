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



