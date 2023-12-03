import React, { useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground,
} from "react-native";
import Modal from "react-native-modal";

import { removeArtikelInDynamoDB } from "./api";
import dummydataKonstruktion from "./dummydataKonstruktion.json";

export default function FertigungsListe() {
    let [dummyData, setDummyData] = useState(dummydataKonstruktion);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const toggleModal = (text) => {
        setModalText(text);
        setModalVisible(!isModalVisible);
    };
    const navigation = useNavigation();

    useEffect(() => {
        console.log("dummyData:", dummyData);
    }, [dummyData]);

    const handleEingebaut = () => {
        navigation.navigate("QRScannerKonstruktion", {
            onCodeScanned: (data) => {
                console.log("Scanned Code:", data);
                // removeArtikelInDynamoDB(data);
                setDummyData((prevData) => {
                    const newData = prevData.filter((item) => {
                        console.log("Typeof", typeof data, typeof item.id);
                        return String(item.id) !== String(data);
                    });
                    toggleModal("Artikel wurde erfolgreich eingebaut");
                    console.log(newData);
                    return newData;
                });
                console.log("dummyData after scan:", dummyData);
            },
        });
        //aus Ferigungsliste löschen
    };

    return (
        <ImageBackground
            source={require("../assets/landrover_vfs.jpg")}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{modalText}</Text>
                        <TouchableOpacity onPress={() => toggleModal()}>
                            <Text style={styles.modalButton}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleEingebaut}
                    >
                        <Text style={styles.buttonText}>Einbauen</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.liste}>
                    {dummyData.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={styles.smallCell}>{item.id}</Text>
                            <Text style={styles.cell}>{item.title}</Text>
                            <Text style={styles.cell}>{item.description}</Text>
                        </View>
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
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        color: "black",
        fontWeight: "bold",
        fontSize: 14,
    },
    smallCell: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        // backgroundColor: "#181818",
        maxWidth: "99%",
    },
    button: {
        backgroundColor: "#009ACD",
        borderColor: "#009AEF",
        borderWidth: 2,
        padding: 10,
        width: 120,
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
