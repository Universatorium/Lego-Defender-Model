import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
} from "react-native";
import dummydata from "../dummydata.json";

export default function LagerUebersicht() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {dummydata.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.title}</Text>
                        <Text style={styles.cell}>{item.amount}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                        </View>
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
        marginTop: StatusBar.currentHeight,
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
        width: 100,
    },
    button: {
        backgroundColor: "#181818",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: "#ddd",
    },
});
