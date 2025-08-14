import * as React from 'react';
import { Text, View, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRouter } from 'expo-router';

export default function index() {
  const router = useRouter();

  return (
    <GestureHandlerRootView >
      {/*containing div for whole app*/}
      <View style={styles.container}>

        <Text >Sample App Title</Text>

        <Button title="Start" onPress={() => router.navigate('/word_guess')} />

      </View>

    </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'gray',
    width: '50%',
    height: '30%',
    alignSelf: 'center',
    marginTop: '50%'
  },

  startButton: {

  }
})
