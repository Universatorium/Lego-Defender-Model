//LagerUebersicht.js
import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ImageBackground,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
    getLagerBestand,
    getDetailDaten,
    putArtikelInDynamoDB,
    removeArtikelInDynamoDB,
} from "./api"; // Stelle sicher, dass du den korrekten Pfad verwendest

export default function LagerUebersicht() {
    const navigation = useNavigation();
    const [lagerBestaende, setLagerBestaende] = useState([]); // Zustand für Lagerbestände

    // Verwende useEffect, um die Daten beim Laden der Komponente zu holen
    const fetchData = async () => {
        try {
            const data = await getLagerBestand();
            const sortedData = data.sort((a, b) => {
                const idA = a[0].N;
                const idB = b[0].N;
                return idA - idB; // Sortierkriterien
            });

            setLagerBestaende(sortedData || []); // Setze den Zustand mit den abgerufenen Daten
        } catch (error) {
            console.error("Fehler beim Abrufen der Lagerbestände:", error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData(); // Funktionsaufruf beim Mounten der Komponente
        }, [])
    );

    const handlePlusPress = () => {
        //Navigation zur QR-Komponente um Artikel-ID abzurufen und anschließend in DynamoDB zu schreiben
        navigation.navigate("QRScannerKonstruktion", {
            onCodeScanned: (data) => {
                console.log("Scanned Code:", data);
                putArtikelInDynamoDB(data);
            },
        });
    };

    const handleMinusPress = () => {
        //Navigation zur QR-Komponente um Artikel-ID abzurufen und anschließend in DynamoDB zu löschen
        navigation.navigate("QRScannerKonstruktion", {
            onCodeScanned: (data) => {
                console.log("Scanned Code:", data);
                removeArtikelInDynamoDB(data);
            },
        });
    };
    // Eine neue Funktion, die aufgerufen wird, wenn eine Zeile geklickt wird
    const handleRowPress = async (rowData) => {
        console.log("Zeile geklickt! Daten:", rowData);

        try {
            // Rufe zusätzliche Detaildaten von der API ab
            const detailDaten = await getDetailDaten(rowData[0].N); // Annahme: Die ID ist der erste Wert in der Zeile
            // console.log("Zusätzliche Detaildaten:", detailDaten);

            // Navigiere zur Detailseite und übergebe sowohl die Hauptdaten als auch die Detaildaten
            navigation.navigate("Detailseite", {
                mainData: rowData,
                detailData: detailDaten,
            });
        } catch (error) {
            console.error("Fehler beim Abrufen der Detaildaten:", error);
        }
    };

    return (
        <ImageBackground
            source={require("test-app/assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePlusPress}
                    >
                        <Text style={styles.buttonText}>Hinzufügen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleMinusPress}
                    >
                        <Text style={styles.buttonText}>Entfernen</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.ueberschrift}>ID</Text>
                    <Text style={styles.ueberschrift}>Bestand</Text>
                    <Text style={styles.ueberschrift}>Artikel</Text>
                    <Text style={styles.ueberschrift}>Farbe</Text>
                </View>
                <ScrollView>
                    {lagerBestaende.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleRowPress(item)} // Hier wird die onPress-Funktion für die Zeile aufgerufen
                        >
                            <View style={styles.row}>
                                {item.map((value, subIndex) => (
                                    <Text
                                        key={subIndex}
                                        style={[
                                            styles.cell,
                                            subIndex === 3
                                                ? styles.rightAlignedCell
                                                : null,
                                            subIndex === 0 || subIndex === 1
                                                ? styles.smallCell
                                                : null,
                                            subIndex === 0 || subIndex === 1
                                                ? styles.borderRight
                                                : null,
                                        ]}
                                    >
                                        {value && value.N
                                            ? value.N
                                            : value && value.S
                                            ? value.S
                                            : ""}
                                    </Text>
                                ))}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#888",
    // marginTop: StatusBar.currentHeight,
    marginLeft: 8,
    marginRight: 8,
    maxWidth: "99%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  ueberschrift: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 3,
    borderBottomColor: "#ddd",
    fontWeight: "bold",
    fontSize: 20,
    padding: 7,
    color: "darkblue",
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  cell: {
    flex: 0.85,
    minWidth: 80,
    maxWidth: 110,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  smallCell: {
    minWidth: 10,
    maxWidth: 50,
    flex: 0.5, // Oder einen anderen Wert, um die Breite anzupassen
  },
  rightAlignedCell: {
    textAlign: "right", // Artikel rechtsbündig
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    // marginTop: 10,
    // marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "lightblue",
    maxWidth: "95%",
  },
  button: {
    backgroundColor: "darkblue",
    borderColor: "#ddd",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,

  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.8,
    resizeMode: "cover",
  },
});
