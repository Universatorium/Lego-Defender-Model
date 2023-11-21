// Übersicht der App
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Login from "./src/components/Login";
import { Account } from "./src/components/Account";

export default function App() {
    return (
        <View style={styles.container}>
            <Account>
                <Login />
            </Account>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        // marginTop: StatusBar.currentHeight,
    },
});
