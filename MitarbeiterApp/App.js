// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Account } from "./components/Account";
import Login from "./components/Login";
import { createStackNavigator } from "@react-navigation/stack";
import LagerUebersicht from "./components/LagerUebersicht";
import FertigungsListe from "./components/Konstruktion";
import Detailseite from "./components/Detailseite";
import QRKonstruktion from "./components/QRScannerKonstruktion";

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Account>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen
                            name="LagerUebersicht"
                            component={LagerUebersicht}
                        />
                        <Stack.Screen
                            name="FertigungsListe"
                            component={FertigungsListe}
                        />
                        <Stack.Screen
                            name="Detailseite"
                            component={Detailseite}
                        />
                        <Stack.Screen
                            name="QRScannerKonstruktion"
                            component={QRKonstruktion}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Account>
        </SafeAreaView>
    );
};

export default App;
