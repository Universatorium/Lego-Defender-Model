import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import QRKonstruktion from "./src/components/QR-Scanner-Konstruktion";

export default function App() {
    return (
        <View>
            {/* <Text style={{ color: "#fff" }}>
                Hier entsteht die MitarbeiterApp!
            </Text> */}
            <StatusBar style="auto" />
            <QRKonstruktion />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        alignItems: "center",
        justifyContent: "center",
    },
});
