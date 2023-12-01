import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground,
} from "react-native";
import {removeArtikelInDynamoDB} from "./api";
import dummydataKonstruktion from "./dummydataKonstruktion.json";

const getDataFromFertigungsliste = () => {
    //Abfrage an die Datenbank anstatt dummydataKonstruktion
};

export default function FertigungsListe() {
    const navigation = useNavigation();    
    const handleEingebaut = () => {
        navigation.navigate("QRScannerKonstruktion", {
            onCodeScanned: (data) => {
                console.log("Scanned Code:", data);
                removeArtikelInDynamoDB(data);
            },
        });
    //aus Ferigungsliste löschen
    };
    

    return (
        <ImageBackground
            source={require("../assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleEingebaut}
                    >
                        <Text style={styles.buttonText}>Eingebaut</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.liste}>
                    {dummydataKonstruktion.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.smallCell}>{item.id}</Text>
                            <Text style={styles.smallCell}>{item.title}</Text>
                            <Text style={styles.cell}>{item.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#888",
        marginLeft: 8,
        marginRight: 8,
        maxWidth: "99%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    smallCell: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        // backgroundColor: "#181818",
        maxWidth: "99%",
    },
    button: {
        backgroundColor: "#009ACD",
        borderColor: "#009AEF",
        borderWidth: 2,
        padding: 10,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    backgroundImage: {
        flex: 1,
        opacity: 0.8,
        resizeMode: "cover",
    },
});
