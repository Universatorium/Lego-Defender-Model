import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerBox}>
    <Image
        source={{ uri: 'https://lego-defender-model-s3bucket.s3.eu-central-1.amazonaws.com/firmenlogo/Logov2.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>Astley</Text>
        <Text style={styles.headerSubText}>Motors</Text>
      </View>
      
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerBox: {
    marginTop: 10,
    paddingLeft: 130,
    paddingRight: 30,
    marginBottom: 20,
    backgroundColor: '#009ACD',
    // borderRadius: 15,
    shadowColor: 'grey',
    flexDirection: 'row', // Setze die Ausrichtung auf horizontal
    alignItems: 'center', // Zentriere den Text und das Bild
  },
  headerContent: {
    flex: 1, // Setze den Inhalt auf flexibel
    marginRight: 10, // Füge einen Abstand zwischen Text und Bild hinzu
  },
  
  headerText: {
    marginTop: 3,
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubText: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 100, 
    height: 80, 
    marginTop: 5,
    marginRight: 15,
    // marginLeft: 15,
    
  },
});
