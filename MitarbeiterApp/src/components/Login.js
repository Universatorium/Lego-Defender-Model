import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
} from "react-native";

const loginFunction = () => {
    alert("Login");
};
export default function Login() {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Mitarbeiter ID"
                    placeholderTextColor="#ddd"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Passwort"
                    placeholderTextColor="#ddd"
                />
                <Button title="Login" onPress={loginFunction} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#181818",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "80%",
        backgroundColor: "#181818",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        color: "#ddd",
    },
});
