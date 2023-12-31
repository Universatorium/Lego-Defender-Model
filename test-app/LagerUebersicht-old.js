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
import { useNavigation } from '@react-navigation/native';
import { getLagerBestand } from './api'; // Stelle sicher, dass du den korrekten Pfad verwendest

export default function LagerUebersicht() {
  const navigation = useNavigation();
  const [lagerBestaende, setLagerBestaende] = useState([]); // Zustand für Lagerbestände

  // Verwende useEffect, um die Daten beim Laden der Komponente zu holen
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Vor dem Aufruf von getLagerBestand');
        const data = await getLagerBestand();
        console.log('Datenpunkte:', lagerBestaende);

        console.log('Nach dem Aufruf von getLagerBestand:', data);
        setLagerBestaende(data || []); // Setze den Zustand mit den abgerufenen Daten
      } catch (error) {
        console.error('Fehler beim Abrufen der Lagerbestände:', error);
      }
    };
    console.log('Einzelner Datenpunkt:', lagerBestaende[0]);

    fetchData(); // Funktionsaufruf beim Mounten der Komponente
  }, []);

  const handlePlusPress = () => {
    console.log('Button QR-Scanner wurde gedrückt');
    navigation.navigate('QRScannerKonstruktion');
  };

  const handleMinusPress = () => {
    console.log('Button QR-Scanner wurde gedrückt');
    navigation.navigate('QRScannerKonstruktion');
  };

  return (
    <ImageBackground
      source={require("test-app/assets/landrover_vfs.jpg")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePlusPress}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMinusPress}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.ueberschrift}>ID</Text>
          <Text style={styles.ueberschrift}>Anzahl</Text>
          <Text style={styles.ueberschrift}>Name</Text>
          <Text style={styles.ueberschrift}>Artikel</Text>
        </View>
        <ScrollView>
  {lagerBestaende.map((item, index) => (
    <View key={index} style={styles.row}>
      {item.map((value, subIndex) => (
        <Text
          key={subIndex}
          style={[
            styles.cell,
            subIndex === 3 ? styles.rightAlignedCell : null,
          ]}
        >
          {value && value.N ? value.N : value && value.S ? value.S : ""}
        </Text>
      ))}
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
    justifyContent: "space-between",
    backgroundColor: "#888",
    // marginTop: StatusBar.currentHeight,
    marginLeft: 8,
    marginRight: 8,
    maxWidth: "98%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  ueberschrift: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    color: "darkblue",
  },
  cell: {
    flex: 1,
    minWidth: 70,
    // justifyContent: "center",
    alignItems: "center",
    padding: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  rightAlignedCell: {
    textAlign: "right", // Artikel rechtsbündig
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: "#181818",
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.8,
    resizeMode: "cover",
  },
});
