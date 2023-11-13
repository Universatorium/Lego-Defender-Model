import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import QRKonstruktion from "./src/components/QR-Scanner-Konstruktion";

export default function App() {
    return (
        <View style={styles.container}>
            <QRKonstruktion />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
    },
});
