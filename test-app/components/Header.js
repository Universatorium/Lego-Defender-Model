import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerBox}>
      <Text style={styles.headerText}>Astley Motors</Text>
      <Image
        source={{ uri: 'https://lego-defender-model-s3bucket.s3.eu-central-1.amazonaws.com/firmenlogo/Logov2.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerBox: {
    marginTop: 10,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 100,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    shadowColor: 'grey',
    alignItems: 'center', // Zentriere den Text und das Bild
  },
  headerText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logo: {
    width: 100, // Passe die Breite an deine Bedürfnisse an
    height: 100, // Passe die Höhe an deine Bedürfnisse an
    marginTop: 10,
  },
});
