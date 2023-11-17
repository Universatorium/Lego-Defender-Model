import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground
} from "react-native";
import dummydata from "./components/dummydata.json";

export default function LagerUebersicht() {
    return (
    <ImageBackground source={require('test-app/assets/landrover_vfs.jpg')} style={styles.backgroundImage}>
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
    </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#181818",
        marginTop: StatusBar.currentHeight,
        marginLeft: 10,
        marginRight: 10,
        maxWidth: "95%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        width: 100, // adjust this value as needed
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
    backgroundImage: {
        flex: 1,
        opacity: 0.8,
        resizeMode: 'cover',
    },
});
