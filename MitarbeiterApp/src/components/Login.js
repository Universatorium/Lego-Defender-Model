import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
} from "react-native";
import LagerUebersicht from "./LagerUebersicht";

export default function Login() {
    const [mitarbeiter, setMitarbeiter] = useState(false);
    const loginFunction = () => {
        alert("Login");
        setMitarbeiter("Lager");
    };
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {!mitarbeiter && (
                    <View>
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
                )}
                {mitarbeiter === "Lager" && <LagerUebersicht />}
                {mitarbeiter === "Konstruktion" && <Konstruktion />}
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
