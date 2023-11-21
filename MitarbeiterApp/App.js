import { StyleSheet, Text, View, StatusBar } from "react-native";
// import QRKonstruktion from "./src/components/QR-Scanner-Konstruktion";
import Login from "./src/components/Login";
import { Account } from "./src/Account";

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
