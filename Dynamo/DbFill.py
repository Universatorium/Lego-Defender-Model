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
    
    # Erstellen Sie eine Verbindung zur Datenbank
    dynamodb = boto3.resource('dynamodb')
    
    # Wählen Sie die Tabelle aus
    
    kunde_table = dynamodb.Table('Kunde')
    mitarbeiter_table = dynamodb.Table('Mitarbeiter')
    lager_table = dynamodb.Table('Lager')
    auftrag_table = dynamodb.Table('Auftrag')
    fertigungsliste_table = dynamodb.Table('Fertigungsliste')
    
    # Definieren Sie die Elemente, die Sie einfügen möchten
    kunde_items = [
    {
        'ID-Kunde': 1,
        'Email': 'Hubert1@gmail.com',
        'Vorname': 'Hubert',
        'Nachname': 'Pouros',
        'Telefon': '+1 (301) 564-2414',
        'Adresse': '7547 Schamberger Parkway'
    },
    {
        'ID-Kunde': 2,
        'Email': 'Delbert_Prosacco@gmail.com',
        'Vorname': 'Delbert',
        'Nachname': 'Prosacco',
        'Telefon': '+1 (406) 939-0582',
        'Adresse': '2030 Stacey Via'
    },
    {
        'ID-Kunde': 3,
        'Email': 'Craig79@hotmail.com',
        'Vorname': 'Craig',
        'Nachname': 'Oberbrunner',
        'Telefon': '+1 (037) 657-3236',
        'Adresse': '209 Freddie Plain'
    },
    {
        'ID-Kunde': 4,
        'Email': 'Norman.Farrell-Bode21@gmail.com',
        'Vorname': 'Norman',
        'Nachname': 'Farrell-Bode',
        'Telefon': '+1 (036) 143-3159',
        'Adresse': '66273 Nicolas Ridge'
    },
    {
        'ID-Kunde': 5,
        'Email': 'Harold7@hotmail.com',
        'Vorname': 'Harold',
        'Nachname': 'Ratke',
        'Telefon': '+1 (932) 455-2312',
        'Adresse': '807 Alexys Keys'
    },
    {
        'ID-Kunde': 6,
        'Email': 'Jennie_Reichel@yahoo.com',
        'Vorname': 'Jennie',
        'Nachname': 'Reichel',
        'Telefon': '+1 (018) 625-5354',
        'Adresse': '4411 Lucile Stravenue'
    },
    {
        'ID-Kunde': 7,
        'Email': 'Beulah.Bergnaum-Rath42@gmail.com',
        'Vorname': 'Beulah',
        'Nachname': 'Bergnaum-Rath',
        'Telefon': '+1 (573) 942-5410',
        'Adresse': '61157 Jacobson Mount'
    },
    {
        'ID-Kunde': 8,
        'Email': 'Christopher_Larson42@gmail.com',
        'Vorname': 'Christopher',
        'Nachname': 'Larson',
        'Telefon': '+1 (870) 163-0443',
        'Adresse': '23577 Keeling Shores'
    },
    {
        'ID-Kunde': 9,
        'Email': 'Todd17@yahoo.com',
        'Vorname': 'Todd',
        'Nachname': 'Robel',
        'Telefon': '+1 (042) 520-9432',
        'Adresse': '2320 Gerda Corners'
    },
    {
        'ID-Kunde': 10,
        'Email': 'Brittany_Jaskolski93@gmail.com',
        'Vorname': 'Brittany',
        'Nachname': 'Jaskolski',
        'Telefon': '+1 (014) 912-2450',
        'Adresse': '8108 Daryl Bypass'
    },
    {
        'ID-Kunde': 11,
        'Email': 'Mary.Hamill1@yahoo.com',
        'Vorname': 'Mary',
        'Nachname': 'Hamill',
        'Telefon': '+1 (133) 738-5382',
        'Adresse': '3111 Foster Heights'
    },
    {
        'ID-Kunde': 12,
        'Email': 'Calvin35@hotmail.com',
        'Vorname': 'Calvin',
        'Nachname': 'Fadel-Larson',
        'Telefon': '+1 (081) 049-4511',
        'Adresse': '5442 Neva Lodge'
    },
    {
        'ID-Kunde': 13,
        'Email': 'Doreen.Mills32@hotmail.com',
        'Vorname': 'Doreen',
        'Nachname': 'Mills',
        'Telefon': '+1 (976) 243-6904',
        'Adresse': '54728 Kaylie Landing'
    },
    {
        'ID-Kunde': 14,
        'Email': 'Sara_Balistreri26@hotmail.com',
        'Vorname': 'Sara',
        'Nachname': 'Balistreri',
        'Telefon': '+1 (514) 733-2191',
        'Adresse': '38810 Monroe Views'
    },
    {
        'ID-Kunde': 15,
        'Email': 'Ken.Rodriguez91@gmail.com',
        'Vorname': 'Ken',
        'Nachname': 'Rodriguez',
        'Telefon': '+1 (838) 433-7129',
        'Adresse': '97796 Vicky Skyway'
    },
    {
        'ID-Kunde': 16,
        'Email': 'Clarence_Effertz24@hotmail.com',
        'Vorname': 'Clarence',
        'Nachname': 'Effertz',
        'Telefon': '+1 (786) 285-7079',
        'Adresse': '5756 Blanda Bridge'
    },
    {
        'ID-Kunde': 17,
        'Email': 'Jody_OConner@gmail.com',
        'Vorname': 'Jody',
        'Nachname': "O'Conner",
        'Telefon': '+1 (887) 553-5163',
        'Adresse': '994 Erdman Meadow'
    },
    {
        'ID-Kunde': 18,
        'Email': 'Mable.Cruickshank@gmail.com',
        'Vorname': 'Mable',
        'Nachname': 'Cruickshank',
        'Telefon': '+1 (329) 334-3562',
        'Adresse': '5779 Bogan Trafficway'
    },
    {
        'ID-Kunde': 19,
        'Email': 'Gloria97@yahoo.com',
        'Vorname': 'Gloria',
        'Nachname': 'Wisozk',
        'Telefon': '+1 (527) 103-4230',
        'Adresse': '7328 Cloyd Freeway'
    },
    {
        'ID-Kunde': 20,
        'Email': 'Raquel39@gmail.com',
        'Vorname': 'Raquel',
        'Nachname': 'Stark',
        'Telefon': '+1 (462) 178-0632',
        'Adresse': '793 Asa Green'
    }
]

    
    lager_item = [
    {
        "ID-Lager": 1,
        "name": "wartung_verschleiss",
        "beschreibung": "Wartung & Verschleiß 4 jahre",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 8000.00,
        "kommentar": "ServiceProdukte"
    },
    {
        "ID-Lager": 2,
        "name": "ueberfuehrung",
        "beschreibung": "Überführungskosten",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 260.00,
        "kommentar": "ServiceProdukte"
    },
    {
        "ID-Lager": 3,
        "name": "kfz_versicherung",
        "beschreibung": "KFZ-Versicherung 2 Jahre",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 4000.0,
        "kommentar": "ServiceProdukte"
    },
    {
        "ID-Lager": 4,
        "name": "zulassungsservice",
        "beschreibung": "Zulassungsservice",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 25.0,
        "kommentar": "ServiceProdukte"
    },
    {
        "ID-Lager": 5,
        "name": "mobilitaetsgarantie",
        "beschreibung": "Mobilitätsgarantie Plus 5 Jahre",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 160.0,
        "kommentar": "ServiceProdukte"
    },
    {
        "ID-Lager": 6,
        "name": "2.0-EcoBlue-XL",
        "beschreibung": "Motor für Land Rover II, II, Sport, 2.0 D, TD, 180PS",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 3600.00,
        "kommentar": "Motor"
    },
    {
        "ID-Lager": 7,
        "name": "4.0-MagaTurbo-XL",
        "beschreibung": "Motor für Land Rover Range III, IV, Sport, 4.0 D, SDV8, 340PS",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 7200.00,
        "kommentar": "Motor"
    },
    {
        "ID-Lager": 8,
        "name": "automatic",
        "beschreibung": "Automatik Schaltung 6 Gang",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1500.00,
        "kommentar": "Getriebe"
    },
    {
        "ID-Lager": 9,
        "name": "manual",
        "beschreibung": "Manuelle Schaltung 6 Gang",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1400.00,
        "kommentar": "Getriebe"
    },
    {
        "ID-Lager": 10,
        "name": "automatic-diff",
        "beschreibung": "Automatik Schaltung 6 Gang mit differential Getriebe und Sperre",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 3200.00,
        "kommentar": "Getriebe"
    },
    {
        "ID-Lager": 11,
        "name": "manual-diff",
        "beschreibung": "Manuelle Schaltung 6 Gang mit differential Getriebe und Sperre",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 3100.0,
        "kommentar": "Getriebe"
    },
    {
        "ID-Lager": 12,
        "name": "green",
        "beschreibung": "Aussenfarbe in Olive-Grün",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Olive-Grün",
        "preis": 0.0,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 13,
        "name": "red",
        "beschreibung": "Aussenfarbe in Rot",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Rot",
        "preis": 13000.00,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 14,
        "name": "blue",
        "beschreibung": "Aussenfarbe in Blau",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Blau",
        "preis": 14000.00,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 15,
        "name": "yellow",
        "beschreibung": "Aussenfarbe in Gelb",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Gelb",
        "preis": 0.00,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 16,
        "name": "black",
        "beschreibung": "Aussenfarbe in Schwarz",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 12000.00,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 17,
        "name": "white",
        "beschreibung": "Aussenfarbe in Weiss",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Weiss",
        "preis": 9000.00,
        "kommentar": "Aussenfarbe"
    },
    {
        "ID-Lager": 18,
        "name": "standard-hood",
        "beschreibung": "Motorhaube Weiss",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Weiss",
        "preis": 250.00,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 19,
        "name": "green-hood",
        "beschreibung": "Motorhaube Olive-Grün",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Olive-Grün",
        "preis": 0.0,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 20,
        "name": "blue-hood",
        "beschreibung": "Motorhaube Blau",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Blau",
        "preis": 350.00,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 21,
        "name": "red-hood",
        "beschreibung": "Motorhaube Rot",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Rot",
        "preis": 350.00,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 22,
        "name": "yellow-hood",
        "beschreibung": "Motorhaube Gelb",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Gelb",
        "preis": 250.00,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 23,
        "name": "black-hood",
        "beschreibung": "Motorhaube Schwarz",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 250.00,
        "kommentar": "Motorhaube"
    },
    {
        "ID-Lager": 24,
        "name": "standard-roof",
        "beschreibung": "Dachfarbe Weiss",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Weiss",
        "preis": 0.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 25,
        "name": "green-roof",
        "beschreibung": "Dachfarbe Olive Grün",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Olive-Grün",
        "preis": 250.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 26,
        "name": "blue-roof",
        "beschreibung": "Dachfarbe Blau",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Blau",
        "preis": 350.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 27,
        "name": "red-roof",
        "beschreibung": "Dachfarbe Rot",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Rot",
        "preis": 350.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 28,
        "name": "yellow-roof",
        "beschreibung": "Dachfarbe Gelb",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Gelb",
        "preis": 250.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 29,
        "name": "black-roof",
        "beschreibung": "Dachfarbe Schwarz",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 250.00,
        "kommentar": "Dach"
    },
    {
        "ID-Lager": 30,
        "name": "roof-rack0",
        "beschreibung": "Kein Dachträger",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 0.0,
        "kommentar": "Dachträger"
    },
    {    
        "ID-Lager": 31,
        "name": "roof-rack1",
        "beschreibung": "Dachträger Standard",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 500.00,
        "kommentar": "Dachträger"
    },
    {
        "ID-Lager": 32,
        "name": "stoff-ebony",
        "beschreibung": "Innenausstattung Stoff Ebony",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Ebony",
        "preis": 0.0,
        "kommentar": "Innenausstattung"
    },
    {
        "ID-Lager": 33,
        "name": "leather",
        "beschreibung": "Innenausstattung Leder",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Braun",
        "preis": 750.0,
        "kommentar": "Innenausstattung1"
    },
    {
        "ID-Lager": 34,
        "name": "rubber-floor-mat",
        "beschreibung": "Gummifussmatte",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 160.00,
        "kommentar": "Innenausstattung2"
    },
    {
        "ID-Lager": 35,
        "name": "fabric-floor-mat",
        "beschreibung": "Stofffussmatte",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "Schwarz",
        "preis": 0.0,
        "kommentar": "Innenausstattung2"
    },
    {
        "ID-Lager": 36,
        "name": "flotten-paket-1",
        "beschreibung": "Flotten-Paket 1 mit: Bodenbelag Plastik/Gummi, Verstärktes Fahrwerk",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1400.00,
        "kommentar": "Packete"
    },
    {
        "ID-Lager": 37,
        "name": "komfort-paket-2",
        "beschreibung": "Komfort-Paket 2 mit: Spannungskonverter 400 Watt, Kühlfach in Mittelkonsole",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1400.00,
        "kommentar": "Packete"
    },
    {
        "ID-Lager": 38,
        "name": "outdoor-paket-3",
        "beschreibung": "Outdoor-Paket 3 mit: Unterbodenschutzvorrichtung an Kraftstofftank und Motor",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.00,
        "kommentar": "Packete"
    },
    {
        "ID-Lager": 39,
        "name": "winter-paket-4",
        "beschreibung": "Winter-Paket 1 mit: Lenkrad beheizt, Fahrersitz und Beifahrersitz Vordersitze mit Sitzheizung, Beheizbare Windschutzscheibe, Klimaanlage",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1800.00,
        "kommentar": "Packete"
    },
    {
        "ID-Lager": 40,
        "name": "hitch",
        "beschreibung": "Anhängevorrichtung, 13 polig",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 450.00,
        "kommentar": "Karosserie"
    },
    {
        "ID-Lager": 41,
        "name": "underbody-protection",
        "beschreibung": "Unterbodenschutz auf Wachsbasis",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 470.00,
        "kommentar": "Karosserie"
    },
    {
        "ID-Lager": 42,
        "name": "mudguard",
        "beschreibung": "Spritzschutz",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 370.00,
        "kommentar": "Karosserie"
    },
    {
        "ID-Lager": 43,
        "name": "getoentescheiben0",
        "beschreibung": "keine getönte Scheiben",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "getönt 0 %",
        "preis": 0.00,
        "kommentar": "Scheiben getönt"
    },
    {
        "ID-Lager": 44,
        "name": "getoentescheiben20",
        "beschreibung": "getönte Scheiben 20 %",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "getönt 20 %",
        "preis": 400.00,
        "kommentar": "Scheiben getönt"
    },
    {
        "ID-Lager": 45,
        "name": "getoentescheiben40",
        "beschreibung": "Getönte Scheiben 40 %",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "getönt 40 %",
        "preis": 470.00,
        "kommentar": "Scheiben getönt"
    },
    {
        "ID-Lager": 46,
        "name": "getoentescheiben80",
        "beschreibung": "Getönte Scheiben 80 %",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "getönt 80 %",
        "preis": 540.00,
        "kommentar": "Scheiben getönt"
    },
    {
        "ID-Lager": 47,
        "name": "sommer",
        "beschreibung": "Sommerreifenset",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 650.00,
        "kommentar": "Reifen"
    },
    {
        "ID-Lager": 48,
        "name": "winter",
        "beschreibung": "Winterreifenset",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 700.00,
        "kommentar": "Reifen"
    },
    {
        "ID-Lager": 49,
        "name": "all-season-tire",
        "beschreibung": "Ganzjahresreifen",
        "S3-bild-url": "https://lego-defender-model-auto.s3.eu-central-1.amazonaws.com/bilder/landrover_web_rundum/landrover_vbs.jpg",
        "anzahl": 0,
        "farbe": "",
        "preis": 1100.00,
        "kommentar": "Reifen"
    },
    {
        "ID-Lager": 50,
        "name": "muenchen",
        "beschreibung": "München",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1400.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 51,
        "name": "stuttgart",
        "beschreibung": "Stuttgart",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 52,
        "name": "berlin",
        "beschreibung": "Berlin",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 53,
        "name": "potsdam",
        "beschreibung": "Potsdam",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 54,
        "name": "bremen",
        "beschreibung": "Bremen",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 55,
        "name": "hamburg",
        "beschreibung": "Hamburg",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 56,
        "name": "wiesbaden",
        "beschreibung": "Wiesbaden",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 57,
        "name": "schwerin",
        "beschreibung": "Schwerin",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 58,
        "name": "hannover",
        "beschreibung": "Hannover",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 59,
        "name": "duesseldorf",
        "beschreibung": "Düsseldorf",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 60,
        "name": "mainz",
        "beschreibung": "Mainz",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 61,
        "name": "saarbruecken",
        "beschreibung": "Saarbrücken",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 62,
        "name": "dresden",
        "beschreibung": "Dresden",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1200.0,
        "kommentar": "Abholort auswählen"
    },
    {
        "ID-Lager": 63,
        "name": "Lieferung bis zur Haustür",
        "beschreibung": "Lieferung bis zur Haustür",
        "S3-bild-url": "",
        "anzahl": 0,
        "farbe": "",
        "preis": 1500.0,
        "kommentar": "Abholort auswählen"
    }
]

    
    mitarbeiter_item = {
        'ID-Mitarbeiter': 1,
        'vorname': 'Frank',
        'nachname': 'Schulz',  
        'email': 'Test@mail.com',
        'rolle': 'test'
    }
    
    auftrag_item = {
        'ID-Auftrag': 1,
        'ID-Kunde': 1,
        'konfigurations': 'test',
        'bestelldatum' : '1.1.2003',
        'gesamtpreis' : 69
    }
    
    fertigungsliste_item = {
        'ID-Fertigungsliste': 1,
        'ID- Auftrag': 1,
        'konfigurations-liste-detailiert': 'test'  
    }
    
    # Fügen Sie die Elemente in die Tabelle ein
    
    insert_data_batch(kunde_table, kunde_items)
    insert_data_batch(mitarbeiter_table, [mitarbeiter_item])
    insert_data_batch(lager_table, lager_item)
    insert_data_batch(auftrag_table, [auftrag_item])
    insert_data_batch(fertigungsliste_table, [fertigungsliste_item])
    
    return {
        'statusCode': 200,
        'body': json.dumps('Datensätze erfolgreich hinzugefügt!')
    }
