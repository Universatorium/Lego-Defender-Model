import AWS from "aws-sdk";
import { poolData } from "./Userpool";

export const getLagerBestand = async (idToken) => {
    const jwtToken = idToken.jwtToken;
    // console.log("identityPoolId: ", poolData.IdentityPoolId);
    // console.log("userPoolId: ", poolData.UserPoolId);
    // console.log("jwtToken: ", jwtToken);

    AWS.config.update({
        region: "eu-central-1",
        dynamoDbCrc32: false,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: poolData.IdentityPoolId,
            Logins: {
                [`cognito-idp.eu-central-1.amazonaws.com/${poolData.UserPoolId}`]:
                    jwtToken,
            },
        }),
    });
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "Lager",
        Select: "ALL_ATTRIBUTES",
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        // console.log("data: ", data.Items);

        return data.Items.map((item) => [
            item.ID_Lager,
            item.Anzahl,
            item.Artikel,
            item.Farbe,
        ]);
    } catch (error) {
        console.error("Fehler beim Abrufen des Lagerbestands:", error);
        return null;
    }
};
export const getDetailDaten = async (idToken) => {
    const dynamoDB = new DynamoDB({ region, credentials });
    const params = {
        TableName: "Lager",
        Key: {
            ID_Lager: { N: ID_Lager.toString() },
        },
    };

    try {
        const data = await dynamoDB.getItem(params).promise();
        return data.Item;
    } catch (error) {
        console.error("Fehler beim Abrufen der Detaildaten:", error);
        return null;
    }
};

export const putArtikelInDynamoDB = async (ID_Lager) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "Lager",
        Key: {
            ID_Lager: { N: ID_Lager.toString() },
        },
        UpdateExpression: "SET Anzahl = if_not_exists(Anzahl, :start) + :inc",
        ExpressionAttributeValues: {
            ":start": { N: "0" }, // Anfangswert, falls 'Anzahl' nicht existiert
            ":inc": { N: "1" }, // Erhöhe um 1
        },
        ReturnValues: "UPDATED_NEW", // Gibt den aktualisierten Wert zurück
    };

    try {
        const data = await dynamoDB.updateItem(params).promise();
        console.log("Artikel erfolgreich zum Lager hinzugefügt:", data);
        return true; // Erfolg signalisieren
    } catch (error) {
        console.error("Fehler beim Hinzufügen des Artikels zum Lager:", error);
        return false; // Fehler signalisieren
    }
};

export const removeArtikelInDynamoDB = async (ID_Lager) => {
    const dynamoDB = new DynamoDB({ region, credentials });

    const params = {
        TableName: "Lager",
        Key: {
            ID_Lager: { N: ID_Lager.toString() },
        },
        UpdateExpression: "SET Anzahl = Anzahl - :dec",
        ConditionExpression: "Anzahl > :zero",
        ExpressionAttributeValues: {
            ":dec": { N: "1" }, // Decrease by 1
            ":zero": { N: "0" }, // Ensure Anzahl is greater than 0
        },
        ReturnValues: "UPDATED_NEW", // Return the updated value
    };

    try {
        const data = await dynamoDB.updateItem(params).promise();
        console.log("Artikel erfolgreich aus dem Lager entfernt:", data);
        return true; // Signal success
    } catch (error) {
        console.error(
            "Fehler beim Entfernen des Artikels aus dem Lager:",
            error
        );
        return false; // Signal error
    }
};
