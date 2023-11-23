//Detailseite.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from './Header';

const Detailseite = ({ route }) => {
  // Daten aus der vorherigen Seite über die Navigation übernehmen
  const { mainData, detailData } = route.params;

  return (
    <View style={styles.container}>
    <Header />
      <Text style={styles.detailUs}>Details</Text>
      <Text style={styles.detailText}>ID: {mainData[0].N}           Anzahl: {mainData[1].N}</Text>
      {/* <Text style={styles.detailText}>Anzahl: {mainData[1].N}</Text> */}
      <Text style={styles.detailText}>Name: {mainData[2].S}</Text>
      <Text style={styles.detailText}>Artikel: {mainData[3].S}</Text>

      {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
      {detailData && detailData.beschreibung && (
        <Text style={styles.detailText}>Beschreibung: {detailData.beschreibung.S}</Text>
      )}
      {detailData && detailData.farbe && (
        <Text style={styles.detailText}>Farbe: {detailData.farbe.S}</Text>
      )}
      {detailData && detailData.preis && (
        <Text style={styles.detailText}>Preis: {detailData.preis.N + ' €'}</Text>
      )}

      {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
      {detailData &&
  Object.entries(detailData).map(([key, value]) => (
    <View key={key}>
      {key === "S3-bild-url" && value.S && (
        <Image
          source={{ uri: value.S }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      {/* {key !== "S3-bild-url" && (
        <Text style={styles.detailText}>
          {key}: {value.S || value.N}
        </Text>
      )} */}
    </View>
  ))}
      {/* Hier kannst du weitere Daten aus 'mainData' und 'detailData' darstellen */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default Detailseite;
