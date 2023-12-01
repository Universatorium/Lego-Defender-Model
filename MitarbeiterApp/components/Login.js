import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Text,
} from "react-native";
import Header from "./Header";
import { Account, AccountContext } from "./Account";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mitarbeiter, setMitarbeiter] = useState(false);

    const { authenticate } = useContext(AccountContext);
    const { logout } = useContext(AccountContext);
    const navigation = useNavigation();

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
                const idToken = data.idToken;
                console.log("idToken: ", idToken);
                if (
                    accessToken &&
                    accessToken.payload["cognito:groups"][0] === "Lager"
                ) {
                    setMitarbeiter("Lager");
                    navigation.navigate("LagerUebersicht", {
                        idToken: idToken,
                    });
                } else if (
                    accessToken &&
                    accessToken.payload["cognito:groups"][0] === "Konstruktion"
                ) {
                    setMitarbeiter("Konstruktion");
                    navigation.navigate("FertigungsListe", {
                        idToken: idToken,
                    });
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
            source={require("../assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.safeContainer}>
                <Header />
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
                                secureTextEntry={true}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={loginFunction}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {mitarbeiter && (
                        <View style={styles.loginContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={logoutFunction}
                            >
                                <Text style={styles.buttonText}>Logout</Text>
                            </TouchableOpacity>
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
        // justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
    },
    container: {
        backgroundColor: "#181818",
        borderWidth: 1,
        borderColor: "#ddd",
        maxHeight: "98%",
        maxWidth: "95%",
        borderRadius: 15,
    },
    loginContainer: {
        backgroundColor: "#888",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        // opacity: 0.9,
        borderRadius: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        color: "#ddd",
        width: "90%",
        borderRadius: 15,
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
        backgroundColor: "#888",
        maxWidth: "95%",
    },
    button: {
        backgroundColor: "#009ACD",
        borderColor: "#ddd",
        borderWidth: 2,
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ddd",
        fontSize: 25,
    },
});
