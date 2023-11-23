import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Detailseite = ({ route }) => {
  // Daten aus der vorherigen Seite über die Navigation übernehmen
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Detailseite</Text>
      <Text style={styles.detailText}>ID: {data[0].N}</Text>
      <Text style={styles.detailText}>Anzahl: {data[1].N}</Text>
      <Text style={styles.detailText}>Name: {data[2].S}</Text>
      <Text style={styles.detailText}>Artikel: {data[3].S}</Text>
      {/* Hier kannst du weitere Daten aus 'data' darstellen */}
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
