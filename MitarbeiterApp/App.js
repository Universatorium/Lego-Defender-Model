import { StyleSheet, Text, View, StatusBar } from "react-native";
import QRKonstruktion from "./src/components/QR-Scanner-Konstruktion";
import Login from "./src/components/Login";

export default function App() {
    return (
        <View style={styles.container}>
            {/* <QRKonstruktion /> */}
            <Login />
            {/* <StatusBar style="auto" /> */}
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
