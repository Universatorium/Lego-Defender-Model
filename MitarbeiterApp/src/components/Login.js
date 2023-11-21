import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
} from "react-native";
import LagerUebersicht from "./LagerUebersicht";
import { Account, AccountContext } from "./Account";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mitarbeiter, setMitarbeiter] = useState(false);

    const { authenticate } = useContext(AccountContext);

    const loginFunction = (event) => {
        console.log("Button pressed");
        event.preventDefault();

        authenticate(email, password)
            .then((data) => {
                console.log("Logged in!", data);
                const accessToken = data.accessToken;
                if (
                    accessToken &&
                    accessToken.payload["cognito:groups"] == "Lager"
                ) {
                    setMitarbeiter("Lager");
                } else if (
                    accessToken &&
                    accessToken.payload["cognito:groups"] == "Konstruktion"
                ) {
                    setMitarbeiter("Konstruktion");
                }
            })
            .catch((err) => {
                console.error("Failed to login", err);
            });
    };
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {!mitarbeiter && (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Mitarbeiter Email"
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
