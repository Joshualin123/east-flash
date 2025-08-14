import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { fetch } from 'expo/fetch';
import { useLocalSearchParams } from "expo-router";

export default function word() {

  const router = useRouter();

  const { file } = useLocalSearchParams();

//file name seems to be right

  //exp://192.168.2.12:8081
  const url = "http://192.168.2.12:5000/"

  const [word, updateWord] = React.useState('')
  const [definition, updateDefinition] = React.useState('')
  const [usage, updateUsage] = React.useState('')

  const [romanization, onChangeRom] = React.useState('');

  //getUser is an async function, need to call it
  const getUser = async () => {
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: file,
      })
      })
    
    .then(response => response.json())
    .then(json => {

      updateWord(json.word)
      updateDefinition(json.definition)
      updateUsage(json.usage)

    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=>{
    getUser()
  }, [])

  function createDefRoute () {

    return (
      <Pressable
        style={styles.enterButton}
        onPress={() =>
          router.navigate({
            pathname: '/definitions',
            params: {
              definition: definition,
              sampleUsage: usage,
              romanizeInput: romanization,
              word: word,
              file: file
            }
          })
        }
      >
        <Text>Enter</Text>
      </Pressable>
    );
  }
  
  return (
    <GestureHandlerRootView>
      <View style={styles.main_box}>

        <View style={styles.center_menu}>

          <View style={styles.word_and_input}>

            <Text numberOfLines={3} style={styles.hangul}>{word}</Text>

            <View style={styles.input_bar}>

              <TextInput style={{ flexGrow: 5 }} placeholder='Enter romanization...' value={romanization} onChangeText={onChangeRom}></TextInput>

              {createDefRoute()}

            </View>

          </View>

        </View>

      </View> 
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  main_box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#00b4d8',
  },
  center_menu: {
    flexDirection: 'column',
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: '95%',
    height: '70%',
    paddingTop: '15%',
    backgroundColor: '#48cae4',
  },
  word_and_input: {
    display: 'flex',
    width: '70%',
    height: '40%',
    borderWidth: 1,
    borderColor: "black",
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  hangul: {
    backgroundColor: '#90e0ef',
    height: '70%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  input_bar: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#90e0ef',
  },
  enterButton: {
    backgroundColor: '#0096c7',
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});