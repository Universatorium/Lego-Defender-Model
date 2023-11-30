// api.js
import { DynamoDB } from 'aws-sdk';
import AWS from 'aws-sdk';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY } from 'react-native-dotenv';


AWS.config.update({
  dynamoDbCrc32: false
});
// Setze die AWS-Region
const region = 'eu-central-1';

const credentials = {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
};
export const getLagerBestand = async () => {
  const dynamoDB = new DynamoDB({ region, credentials });
  const params = {
    TableName: 'Lager',
    Select: 'ALL_ATTRIBUTES',
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items.map(item => [item.ID_Lager, item.anzahl, item.name, item.kommentar]);
  } catch (error) {
    console.error('Fehler beim Abrufen des Lagerbestands:', error);
    return null;
  }
};
export const getDetailDaten = async (ID_Lager) => {
  const dynamoDB = new DynamoDB({ region, credentials });
  const params = {
    TableName: 'Lager',
    Key: {
      'ID_Lager': { N: ID_Lager.toString() },
    },
  };

  try {
    const data = await dynamoDB.getItem(params).promise();
    return data.Item;
    // return [
    //   data.Item.ID_Lager,
    //   data.Item.beschreibung,
    //   data.Item.farbe,
    //   data.Item.kommentar,
    //   data.Item.name,
    //   data.Item.preis,
    //   data.Item['S3-bild-url'],
    // ];


  } catch (error) {
    console.error('Fehler beim Abrufen der Detaildaten:', error);
    return null;
  }
};
export const putArtikelInDynamoDB = async (ID_Lager) => {
  const dynamoDB = new DynamoDB({ region, credentials });

  const params = {
    TableName: 'Lager',
    Key: {
      'ID_Lager': { N: ID_Lager.toString() },
    },
    UpdateExpression: 'SET anzahl = if_not_exists(anzahl, :start) + :inc',
    ExpressionAttributeValues: {
      ':start': { N: '0' }, // Anfangswert, falls 'anzahl' nicht existiert
      ':inc': { N: '1' },   // Erhöhe um 1
    },
    ReturnValues: 'UPDATED_NEW', // Gibt den aktualisierten Wert zurück
  };

  try {
    const data = await dynamoDB.updateItem(params).promise();
    console.log('Artikel erfolgreich zum Lager hinzugefügt:', data);
    return true; // Erfolg signalisieren
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Artikels zum Lager:', error);
    return false; // Fehler signalisieren
  }
};

