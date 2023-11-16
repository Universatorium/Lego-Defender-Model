import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    # Beispiel-Datensätze
    kunde_data = [{"ID-Kunde": 1, "Name": "Kunde 1"}, {"ID-Kunde": 2, "Name": "Kunde 2"}]
    mitarbeiter_data = [{"ID-Mitarbeiter": 1, "Name": "Mitarbeiter 1"}, {"ID-Mitarbeiter": 2, "Name": "Mitarbeiter 2"}]
    lager_data = [{"ID-Lager": 1, "Ort": "Lager 1"}, {"ID-Lager": 2, "Ort": "Lager 2"}]
    auftrag_data = [{"ID-Auftrag": 1, "Produkt": "Produkt 1"}, {"ID-Auftrag": 2, "Produkt": "Produkt 2"}]
    fertigungsliste_data = [{"ID-Fertigungsliste": 1, "Produktionsnummer": "123"}, {"ID-Fertigungsliste": 2, "Produktionsnummer": "456"}]

    # Funktion zum Einfügen von Datensätzen
    def insert_data(table, data):
        for item in data:
            table.put_item(Item=item)

    # Tabellen-Objekte
    kunde_table = dynamodb.Table('Kunde')
    mitarbeiter_table = dynamodb.Table('Mitarbeiter')
    lager_table = dynamodb.Table('Lager')
    auftrag_table = dynamodb.Table('Auftrag')
    fertigungsliste_table = dynamodb.Table('Fertigungsliste')

    # Einfügen der Datensätze
    insert_data(kunde_table, kunde_data)
    insert_data(mitarbeiter_table, mitarbeiter_data)
    insert_data(lager_table, lager_data)
    insert_data(auftrag_table, auftrag_data)
    insert_data(fertigungsliste_table, fertigungsliste_data)

    return {
        'statusCode': 200,
        'body': json.dumps('Datensätze erfolgreich hinzugefügt!')
    }
