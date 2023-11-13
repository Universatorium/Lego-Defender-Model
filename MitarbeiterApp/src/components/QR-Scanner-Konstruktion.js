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
    const stopScanning = () => {
        setShowScanner(false);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // stopScanning();
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
                {scanned && (
                    <Button
                        title={"Tap to Scan Again"}
                        onPress={() => setScanned(false)}
                    />
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
        marginTop: StatusBar.currentHeight,
    },
    Scanner: {
        width: "100%",
        height: "100%",
        // backgroundColor: "#181818",
    },
    ButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    AgainButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});
