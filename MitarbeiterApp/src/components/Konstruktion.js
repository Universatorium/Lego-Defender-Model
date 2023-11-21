import React, { useState, useEffect } from "react";
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
import dummydataKonstruktion from "../dummydataKonstruktion.json";

const getDataFromFertigungsliste = () => {
    //Abfrage an die Datenbank anstatt dummydataKonstruktion
};
const handleHinzufuegen = () => {
    //Zur Datenbank hinzufügen
};

export default function FertigungsListe() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleHinzufuegen}
                >
                    <Text style={styles.buttonText}>hinzufügen</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.liste}>
                {dummydataKonstruktion.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.title}</Text>
                        <Text style={styles.cell}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#181818",
        justifyContent: "center",
        alignItems: "center",
    },
    liste: {
        maxWidth: "80%",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cell: {
        minWidth: 70,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,

        color: "#ddd",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        backgroundColor: "#181818",
        maxWidth: "95%",
    },
    button: {
        backgroundColor: "#181818",
        borderColor: "#ddd",
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        minWidth: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
    },
});
