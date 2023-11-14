import { StyleSheet, Text, View, StatusBar } from "react-native";
import QRKonstruktion from "./src/components/QR-Scanner-Konstruktion";

export default function App() {
    return (
        <View style={styles.container}>
            <QRKonstruktion />
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
