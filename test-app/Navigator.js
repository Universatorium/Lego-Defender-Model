// Navigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import Header from './components/Header';
import LagerUebersicht from './LagerUebersicht';
import QRScannerKonstruktion from './QRScannerKonstruktion';
import { getLagerBestand } from './api'; // Ändere den Import

const Stack = createStackNavigator();
// Funktion zum Abrufen des Lagerbestands aus der DynamoDB-Tabelle


const HomeScreen = ({ navigation }) => {
  const handleButton1Press = async () => {
    const lagerBestand = await getLagerBestand();
    console.log('Button Lager wurde gedrückt');
    navigation.navigate('LagerUebersicht', { lagerBestand });  };

  const handleButton2Press = () => {
    console.log('Button Fertigung wurde gedrückt');
    // Hier kannst du die Logik für den zweiten Button implementieren
  };
  const handleButton3Press = () => {
    console.log('Button QR-Scanner wurde gedrückt');
    navigation.navigate('QRScannerKonstruktion');
  };

  return (
    <ImageBackground source={require('test-app/assets/landrover_vfs.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header />
        <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
          <Text style={styles.buttonText}>Lager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>Fertigung</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton3Press}>
          <Text style={styles.buttonText}>QR-Scanner</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="LagerUebersicht" component={LagerUebersicht} />
      <Stack.Screen name="QRScannerKonstruktion" component={QRScannerKonstruktion} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 0.7,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    opacity: 1,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navigator;
