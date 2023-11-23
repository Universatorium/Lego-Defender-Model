//Detailseite.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Detailseite = ({ route }) => {
  // Daten aus der vorherigen Seite über die Navigation übernehmen
  const { mainData, detailData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Detailseite</Text>
      <Text style={styles.detailText}>ID: {mainData[0].N}</Text>
      <Text style={styles.detailText}>Anzahl: {mainData[1].N}</Text>
      <Text style={styles.detailText}>Name: {mainData[2].S}</Text>
      <Text style={styles.detailText}>Artikel: {mainData[3].S}</Text>

    {/* Überprüfe, ob detailData vorhanden ist, bevor du darauf zugreifst */}
    {detailData &&
        Object.entries(detailData).map(([key, value]) => (
          <Text style={styles.detailText} key={key}>
            {key}: {value.S || value.N}
          </Text>
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
});

export default Detailseite;
