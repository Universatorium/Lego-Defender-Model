// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
