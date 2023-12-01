import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export default function QRKonstruktion({ route }) {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log("camera permission", status);
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const startScanning = () => {
        setShowScanner(true);
    };
    const stopScanning = () => {
        setShowScanner(false);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        stopScanning();
        if (route.params?.onCodeScanned) {
            route.params.onCodeScanned(data);
        }
        navigation.goBack();
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {showScanner && (
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            <View style={styles.ButtonContainer}>
                {!showScanner && (
                    <View style={styles.ButtonContainer}>
                        <Button
                            title={"Start Scanning"}
                            onPress={startScanning}
                        />
                    </View>
                )}
            </View>
            <View style={styles.AgainButtonContainer}>
                {scanned && (
                    <Button
                        title={"Tap to Scan Again"}
                        onPress={() => setScanned(false)}
                    />
                )}
                {showScanner && !scanned && (
                    <Button title={"Stop Scanning"} onPress={stopScanning} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#181818",
        // marginTop: StatusBar.currentHeight,
    },
    Scanner: {
        width: "100%",
        height: "100%",
    },
    ButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    AgainButtonContainer: {
        position: "absolute",
        bottom: "33%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
