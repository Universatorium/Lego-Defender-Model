//Detailseite.js
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "react-native-modal";
import {
    putArtikelInDynamoDB,
    removeArtikelInDynamoDB,
    getDetailDaten,
} from "./api"; // Stelle sicher, dass du die entsprechende Funktion zum Schreiben in die DynamoDB hast
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";

const Detailseite = ({ route }) => {
    // const { mainData, detailData } = route.params;
    // Create state variables for mainData and detailData
    const [mainData, setMainData] = useState(route.params.mainData);
    const [detailData, setDetailData] = useState(route.params.detailData);

    // Beispiel-State und Funktion für Lagerbestände
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const toggleModal = (text = "") => {
        setModalText(text);
        setModalVisible(!isModalVisible);
    };
    useEffect(() => {
        // Lade die Daten beim Mounten der Komponente
        fetchData();
    }, []);

    const fetchData = async () => {
        console.log("mainData", mainData);
        console.log("detailData", detailData);
        try {
            // Rufe die Funktion auf, um die aktualisierten Detaildaten zu erhalten
            const updatedDetailData = await getDetailDaten(mainData[0].N);
            if (updatedDetailData) {
                setDetailData(updatedDetailData); // Update detailData state
                // console.log("Detaildaten aktualisiert:", updatedDetailData);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Detaildaten:", error);
        }
    };
    const handlePlusPress = async () => {
        console.log("Artikel wird zum Lager hinzugefügt");

        try {
            console.log("mainData[0].N", mainData[0].N);
            const success = await putArtikelInDynamoDB(mainData[0].N);

            if (success) {
                // alert('Artikel wurde erfolgreich zum Lager hinzugefügt');
                fetchData();
                // Nach dem Hinzufügen des Artikels rufe die fetchData-Funktion auf, um die Daten zu aktualisieren
                toggleModal("Artikel wurde erfolgreich zum Lager hinzugefügt");
            } else {
                console.error("Fehler beim Hinzufügen des Artikels zum Lager");
            }
        } catch (error) {
            console.error(
                "Fehler beim Hinzufügen des Artikels zum Lager:",
                error
            );
        }
    };
    const handleMinusPress = async () => {
        console.log("Artikel wird aus dem Lager entfernt.");

        if (detailData.Anzahl.N > 0) {
            const success = await removeArtikelInDynamoDB(mainData[0].N);

            if (success) {
                // Nach dem Hinzufügen des Artikels rufe die fetchData-Funktion auf, um die Daten zu aktualisieren
                fetchData();
                // Modal anzeigen mit entsprechendem Text
                toggleModal("Artikel wurde erfolgreich aus dem Lager entfernt");
            } else {
                console.error(
                    "Fehler beim Entfernen des Artikels aus dem Lager"
                );
            }
        } else {
            // Zeige eine Benachrichtigung oder tue nichts, wenn die Anzahl 0 ist
            toggleModal(
                "Artikelanzahl ist bereits 0. Artikel kann nicht entfernt werden."
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handlePlusPress();
                    }}
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
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{modalText}</Text>
                    <TouchableOpacity onPress={() => toggleModal()}>
                        <Text style={styles.modalButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.container}>
                <Text style={styles.detailUs}>Details</Text>

                <Text style={styles.detailText}>
                    ID: {mainData[0].N} Anzahl: {detailData.Anzahl.N}
                </Text>

                {/* <Text style={styles.detailText}>Anzahl: {mainData[1].N}</Text> */}
                <Text style={styles.detailTextBeschreibung}>
                    Artikel: {detailData.Artikel.S}
                </Text>
                {/* <Text style={styles.detailText}>Farbe: {mainData[3].S}</Text> */}

                {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
                {detailData && detailData.Beschreibung && (
                    <Text style={styles.detailTextBeschreibung}>
                        {" "}
                        {detailData.Beschreibung.S}
                    </Text>
                )}
                {detailData && detailData.Farbe && (
                    <Text style={styles.detailText}>
                        Farbe: {detailData.Farbe.S}
                    </Text>
                )}
                {detailData && detailData.Preis && (
                    <Text style={styles.detailText}>
                        Preis: {detailData.Preis.N + " €"}
                    </Text>
                )}

                {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
                {detailData &&
                    Object.entries(detailData).map(([key, value]) => (
                        <View key={key}>
                            {key === "S3_bild_url" && value.S && (
                                <Image
                                    source={{ uri: value.S }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
                        </View>
                    ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    detailText: {
        fontSize: 20,
        marginBottom: 10,
    },
    detailTextBeschreibung: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
    },
    detailUs: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
    },
    image: {
        width: 240,
        height: 150,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#009ACD",
        borderColor: "#ddd",
        borderWidth: 2,
        padding: 10,
        borderRadius: 15,
        minWidth: 80,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
    },
    modalContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButton: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#009ACD",
        // borderColor: "#ddd",
        // borderWidth: 2,
        padding: 13,
        borderRadius: 15,
        minWidth: 55,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Detailseite;
