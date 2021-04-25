import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import LoggedOutNav from './navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromise = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require('./assets/logo.png')];
    const imagePromise = imagesToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all([fontPromise, imagePromise]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
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
