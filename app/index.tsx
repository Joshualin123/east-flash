import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, View, StyleSheet, Button, Pressable } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [file, changeFile] = useState('')
  const [currFileText, changeFileText] = useState('None')

  const [fileOptions, updateFileCol] = useState(
    [
    {
      title: 'Chinese',
      fileName: 'baimeigui.csv',
        bgColor: '#caf0f8'
    },
    {
      title: 'Top 6000 KR Words',
      fileName: 'new_6000_kr.csv',
      bgColor: '#caf0f8'
    }
    ])

  function changeButColor(index: number) {
    for (let i = 0; i < Object.keys(fileOptions).length; i++) {
      fileOptions[i].bgColor = '#caf0f8'
    }
    fileOptions[index].bgColor = '#48cae4'
  }

  //make button fade from red to transparent rapidly once on click when no file was selected
  const [buttonBorder, updateButBorder] = useState('black')
  const [count, incrementCount] = useState(0)

  useEffect(() => {

      if (currFileText == 'None') {
        updateButBorder('black')
      }
      const timerId = setTimeout(() => {
        updateButBorder('transparent');
        console.log('set transparent')
      }, 100); 
      
    return () => clearTimeout(timerId);
  }, [count])

  function fileModal() {
    return(
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.modalContain}>
          <View style={styles.selectFile}>

            {fileOptions.map((fileOption, index) => {
              return (
                <Pressable key={index} style={[styles.modalButton, { backgroundColor: fileOption.bgColor }]} onPress={() => { changeFile(fileOption.fileName); changeFileText(fileOption.title); changeButColor(index) }}>
                  <Text style={styles.modalButtonText}>{fileOption.title}</Text>
                </Pressable>
              )
            })}

            <Pressable style={[styles.modalButton, { backgroundColor: '#ade8f4'}]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.modalButtonText, {color: 'red'}]}>Close</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    )
  }

  return (

    <GestureHandlerRootView style={{ backgroundColor: '#00b4d8', height: '100%'}}>
          <View style={styles.container}>

            <Text style={{ fontSize: 30 }}>East-Flash</Text>

            {fileModal()}

            <Pressable style={styles.buttons} onPress={() => setModalVisible(!modalVisible)}><Text>Select data set</Text></Pressable>

            <Text>Current data set: {currFileText}</Text>

        <Pressable
          style={[styles.buttons, {borderWidth: 1, borderColor: buttonBorder}]}
          onPress={() => {
            
            if (currFileText != 'None') {
              router.navigate({
                pathname: '/word_guess',
                params: { file: file },
              });
            }
            incrementCount(count + 1)
          }}
        >
          <Text>Start</Text>
        </Pressable>

          </View>

        </GestureHandlerRootView>

  )
}

const styles = StyleSheet.create({

  defaultFont: {
    fontFamily: 'YourFontName', // must match the loaded font name
  },
  buttons: {
    backgroundColor: '#0096c7',
    height: '15%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    alignSelf: 'center',
    marginTop: '50%',
  },
  selectFile: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#caf0f8'
  },
  modalButton: {
    width: '80%',
    height: '20%',
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    margin: '1%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
  },
  modalContain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 999,
    backgroundColor: '#90e0ef'
  }
})
