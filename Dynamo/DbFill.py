import boto3
import json
import decimal

def lambda_handler(event, context):

    def insert_data_batch(table, items):
        with table.batch_writer() as batch:
            for item in items:
                # Konvertieren Sie alle Float-Werte in item zu Decimal
                for key, value in item.items():
                    if isinstance(value, float):
                        item[key] = decimal.Decimal(str(value))
                
                # Fügen Sie das aktualisierte Element in die Batch-Schreiboperation ein
                batch.put_item(Item=item)

    def read_json_file(file_path):
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    
    # Erstellen Sie eine Verbindung zur Datenbank
    dynamodb = boto3.resource('dynamodb')

    # Wählen Sie die Tabelle aus
    kunde_table = dynamodb.Table('Kunde')
    mitarbeiter_table = dynamodb.Table('Mitarbeiter')
    lager_table = dynamodb.Table('Lager')
    auftrag_table = dynamodb.Table('Auftrag')
    fertigungsliste_table = dynamodb.Table('Fertigungsliste')
    produkte_table = dynamodb.Table('Produkte')
    konfiguration_table = dynamodb.Table('Konfiguration')

    # Definieren Sie die Dateipfade für die JSON-Dateien
    kunde_file_path = 'kunde.json'
    mitarbeiter_file_path = 'mitarbeiter.json'
    lager_file_path = 'lager.json'
    auftrag_file_path = 'auftrag.json'
    fertigungsliste_file_path = 'fertigungsliste.json'
    produkte_file_path = 'produkte.json'
    konfiguration_file_path = 'konfiguration.json'

    # Lesen Sie die Daten aus den JSON-Dateien
    kunde_items = read_json_file(kunde_file_path)
    mitarbeiter_item = read_json_file(mitarbeiter_file_path)
    lager_item = read_json_file(lager_file_path)
    auftrag_item = read_json_file(auftrag_file_path)
    fertigungsliste_item = read_json_file(fertigungsliste_file_path)
    produkte_item = read_json_file(produkte_file_path)
    konfiguration_item = read_json_file(konfiguration_file_path)

    # Fügen Sie die Elemente in die Tabelle ein
    insert_data_batch(kunde_table, kunde_items)
    insert_data_batch(mitarbeiter_table, mitarbeiter_item)
    insert_data_batch(lager_table, lager_item)
    insert_data_batch(auftrag_table, auftrag_item)
    insert_data_batch(fertigungsliste_table, fertigungsliste_item)
    insert_data_batch(produkte_table, produkte_item)
    insert_data_batch(konfiguration_table, konfiguration_item)

    return {
        'statusCode': 200,
        'body': json.dumps('Datensätze erfolgreich hinzugefügt!')
    }
