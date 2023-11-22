import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";
import LagerUebersicht from "./LagerUebersicht";
import FertigungsListe from "./Konstruktion";
import { Account, AccountContext } from "./Account";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mitarbeiter, setMitarbeiter] = useState(false);

    const { authenticate } = useContext(AccountContext);
    const { logout } = useContext(AccountContext);

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
        console.log("logged out!");
        event.preventDefault();
        logout();
        setMitarbeiter(false);
    };
    return (
        <ImageBackground
            source={require("../../assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    {!mitarbeiter && (
                        <View style={styles.loginContainer}>
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
                            <TouchableOpacity
                                style={styles.button}
                                onPress={loginFunction}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {mitarbeiter === "Lager" && (
                        <View style={styles.loginContainer}>
                            <View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={logoutFunction}
                                >
                                    <Text style={styles.buttonText}>
                                        Logout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <LagerUebersicht />
                        </View>
                    )}
                    {mitarbeiter === "Konstruktion" && (
                        <View style={styles.loginContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={logoutFunction}
                            >
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
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
        marginTop: StatusBar.currentHeight,
        opacity: 0.8,
    },
    container: {
        backgroundColor: "#181818",
        borderWidth: 1,
        borderColor: "#ddd",
        maxHeight: "98%",
        maxWidth: "95%",
    },
    loginContainer: {
        backgroundColor: "#181818",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        opacity: 0.8,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        color: "#ddd",
        width: "90%",
    },
    backgroundImage: {
        flex: 1,
        opacity: 0.8,
        resizeMode: "cover",
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
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ddd",
        fontSize: 25,
    },
});
