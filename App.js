import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import * as Font from 'expo-font';
import HomeScreen from './navigation/HomeScreen/HomeScreen';

// const ROBOTO = require('../node_modules/native-base/Fonts/Roboto.ttf');
// const ROBOTO_MEDIUM = require('../node_modules/native-base/Fonts/Roboto_medium.ttf');

const Stack = createStackNavigator();

export default function App({ navigation }) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, [fontsLoaded]);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return <Spinner color="#f16921" />
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
        style={{ padding: 10 }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      <HomeScreen />
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
