// api.js
import { DynamoDB } from 'aws-sdk';
import AWS from 'aws-sdk';

AWS.config.update({
  dynamoDbCrc32: false
});
// Setze die AWS-Region
const region = 'eu-central-1';

const credentials = {
  accessKeyId: 'XXXXX',
  secretAccessKey: 'XXXXX',
};

export const getLagerBestand = async () => {
  const dynamoDB = new DynamoDB({ region, credentials });
  const params = {
    TableName: 'Matzelager',
    // Select: 'ALL_ATTRIBUTES',
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items.map(item => [item.Lager_id, item.Artikel, item.Farbe]);
  } catch (error) {
    console.error('Fehler beim Abrufen des Lagerbestands:', error);
    return null;
  }
};
