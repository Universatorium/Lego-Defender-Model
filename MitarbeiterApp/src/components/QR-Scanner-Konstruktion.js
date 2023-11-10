import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function QRKonstruktion() {
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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {showScanner ? (
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={styles.Scanner}
                />
            ) : (
                <Button
                    title={"Start QR Code Scanner"}
                    onPress={startScanning}
                />
            )}
            {scanned && (
                <Button
                    title={"Tap to Scan Again"}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#181818",
    },
    Scanner: {
        width: "100%",
        height: "100%",
        backgroundColor: "#181818",
    },
});
