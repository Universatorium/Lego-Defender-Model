import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
    ImageBackground,
} from "react-native";
import LagerUebersicht from "./LagerUebersicht";
import FertigungsListe from "./Konstruktion";
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
                // console.log("Logged in!", data);
                const accessToken = data.accessToken;
                console.log(
                    "Mitarbeiterrolle: ",
                    accessToken.payload["cognito:groups"][0]
                );
                if (
                    accessToken &&
                    accessToken.payload["cognito:groups"][0] === "Lager"
                ) {
                    setMitarbeiter("Lager");
                } else if (
                    accessToken &&
                    accessToken.payload["cognito:groups"][0] === "Konstruktion"
                ) {
                    setMitarbeiter("Konstruktion");
                }
            })
            .catch((err) => {
                console.error("Failed to login", err);
            });
    };
    const logoutFunction = (event) => {
        console.log("Button pressed");
        event.preventDefault();
        setMitarbeiter(false);
    };
    return (
        <ImageBackground
            source={require("../../assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.safeContainer}>
                <View>
                    {!mitarbeiter && (
                        <View style={styles.container}>
                            <TextInput
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                                placeholder="Mitarbeiter Email"
                                placeholderTextColor="#ddd"
                            />
                            <TextInput
                                onChangeText={(text) => setPassword(text)}
                                style={styles.input}
                                placeholder="Passwort"
                                placeholderTextColor="#ddd"
                            />
                            <Button title="Login" onPress={loginFunction} />
                        </View>
                    )}
                    {mitarbeiter === "Lager" && (
                        <View>
                            <Button
                                title="Logout"
                                onPress={logoutFunction}
                            ></Button>
                            <LagerUebersicht />
                        </View>
                    )}
                    {mitarbeiter === "Konstruktion" && (
                        <View>
                            <Button
                                title="Logout"
                                onPress={logoutFunction}
                            ></Button>
                            <FertigungsListe />
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground>
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
    backgroundImage: {
        flex: 1,
        opacity: 0.8,
        resizeMode: "cover",
    },
});
