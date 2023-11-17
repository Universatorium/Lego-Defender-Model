import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import Header from './components/Header';
import Navigator from './Navigator';
const App = () => {
  const navigation = useNavigation(); // Hook von react-navigation, um die Navigation zu erhalten

  const handleButton1Press = () => {
    console.log('Button Lager wurde gedrückt');
    navigation.navigate('LagerUebersicht'); // Hier wird die Navigation aufgerufen
  };

  const handleButton2Press = () => {
    console.log('Button Mitarbeiter wurde gedrückt');
    // Hier kannst du die Logik für den zweiten Button implementieren
  };

  return (
    <ImageBackground source={require('test-app/assets/landrover_vfs.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header />
        <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
          <Text style={styles.buttonText}>Lager</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
          <Text style={styles.buttonText}>Mitarbeiter</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    opacity: 0.8,
    resizeMode: 'cover', // 'cover' für Hintergrundbild in voller Breite
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
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

export default App;
