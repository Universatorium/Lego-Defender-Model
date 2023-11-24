//Detailseite.js
import React, { useEffect } from "react";
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { putArtikelInDynamoDB, getDetailDaten } from '../api'; // Stelle sicher, dass du die entsprechende Funktion zum Schreiben in die DynamoDB hast
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
const Detailseite = ({ route }) => {
  // Daten aus der vorherigen Seite über die Navigation übernehmen
  const { mainData, detailData } = route.params;
  const navigation = useNavigation();
 
  const fetchData = async () => {
    try {
      // Rufe die Funktion auf, um die aktualisierten Detaildaten zu erhalten
      const updatedDetailData = await getDetailDaten(mainData[0].N);

      // ... (Aktualisiere den State oder mache andere Dinge mit den Daten)
    } catch (error) {
      console.error('Fehler beim Abrufen der Detaildaten:', error);
    }
  };

  useEffect(() => {
    // Lade die Daten beim Mounten der Komponente
    fetchData();
  }, []);
 
  const handlePlusPress = async () => {
    console.log('Artikel wird zum Lager hinzugefügt');

    try {
      const success = await putArtikelInDynamoDB(mainData[0].N);
      
      if (success) {
        alert('Artikel wurde erfolgreich zum Lager hinzugefügt');
        // Nach dem Hinzufügen des Artikels rufe die fetchData-Funktion auf, um die Daten zu aktualisieren
        fetchData();
      } else {
        console.error('Fehler beim Hinzufügen des Artikels zum Lager');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Artikels zum Lager:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePlusPress}>
          <Text style={styles.buttonText}>Hinzufügen</Text>
        </TouchableOpacity>
      </View>
  <View style={styles.container}>
    <Header />
      <Text style={styles.detailUs}>Details</Text>
      <Text style={styles.detailText}>ID: {mainData[0].N}           Anzahl: {mainData[1].N}</Text>
      {/* <Text style={styles.detailText}>Anzahl: {mainData[1].N}</Text> */}
      <Text style={styles.detailText}>Name: {mainData[2].S}</Text>
      <Text style={styles.detailText}>Artikel: {mainData[3].S}</Text>

      {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
      {detailData && detailData.beschreibung && (
        <Text style={styles.detailText}>Beschreibung: {detailData.Beschreibung.S}</Text>
      )}
      {detailData && detailData.farbe && (
        <Text style={styles.detailText}>Farbe: {detailData.Farbe.S}</Text>
      )}
      {detailData && detailData.preis && (
        <Text style={styles.detailText}>Preis: {detailData.Preis.N + ' €'}</Text>
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
    fontSize: 18,
    marginBottom: 10,
  },
  detailUs: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "darkblue",
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
});

export default Detailseite;
