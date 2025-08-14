import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import React, {useState, useEffect} from "react";
import { romanize } from 'koroman';

export default function definitions() {

  const router = useRouter();

  //romanize input is the user input, word is the original east language character
  const { definition, sampleUsage, romanizeInput, word, file } = useLocalSearchParams();
  
  const [pinyin, updatePinyin] = useState('')
  const [accentPinyin, updateAccPinyin] = useState('')
  const [correctRomanize, updateRomanize] = useState('')
  const [engAnswer, updateAns] = useState('')

  const getPinyin = async () => {
      
    const url = "http://192.168.2.12:5000/pinyin"

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          word: word,
        })
        })
      
      .then(response => response.json())
      .then(json => {
        //pinyin will be accentless, for comparing with user input since user cant add accents
        updatePinyin(json.lazyPinyin)
        updateAccPinyin(json.accentedPinyin)
      })
      .catch(error => {
        console.error(error);
      });
    }
  
  useEffect(()=>{
    if (file == 'baimeigui.csv') {
      getPinyin()
    }
  }, [])
  
  useEffect(()=>{
      updateAns(accentPinyin)
  }, [pinyin])
  
  const krRomanized = romanize(word as string)

  useEffect(()=>{
    updateRomanize(krRomanized)
    updateAns(krRomanized)
  }, [word])

  function evaluateUserIn() {

    if (file == 'new_6000_kr.csv') {
      
      if ((romanizeInput as string) == correctRomanize) {
        return '✅'
      } else {
        return '❌'
      }
      
    } else if (file == 'baimeigui.csv') {

      if ((romanizeInput as string) == romanize(pinyin)) {
        return '✅'
      } else {
        return '❌'
      }
      
    }
    
  }

  function returnBarComp() {
    return (
      <View style={styles.return_bar}>
        <Pressable
          style={styles.returnMenu}
          onPress={() =>
            router.navigate({
              pathname: '/',
            })
          }
        >
          <Text>Return To Menu</Text>
        </Pressable>
      </View>
    )
  }

  function evaluationComp() {

    return (
      <View style={styles.ansConfirm}>
        <Text >{evaluateUserIn()}</Text>
        <Text >Answer: {word} / {engAnswer}</Text>
        <Text >Your Answer: {romanizeInput}</Text>
      </View>
    )
  }

  function wordInfoComp() {
    return(
      <View style={styles.text_area}>

        <Text numberOfLines={6} style={styles.center_text}>Definition: {definition}</Text>

        <Text numberOfLines={6} style={styles.center_text}>Example: {sampleUsage}</Text>

      </View> 
    )
  }

  function continueButtonComp() {

    return (
      <Pressable
        style={styles.contButton}
        onPress={() =>
          router.navigate({
            pathname: '/word_guess',
            params: { file: file }
          })
        }
      >
        <Text>Continue</Text>
      </Pressable>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.main_box}>

        {returnBarComp()}

        <View style={styles.center_menu}>

          {evaluationComp()}

          {wordInfoComp()}

          {continueButtonComp()}

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
  return_bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '10%',
    width: '95%',
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: '#0096c7',
  },
  returnMenu: {
    backgroundColor: '#ade8f4',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1,
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
  center_menu: {
    flexDirection: 'column',
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1,
    width: '95%',
    height: '70%',
    backgroundColor: '#90e0ef',
  },
  ansConfirm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '20%',
  },
  text_area: {
    display: 'flex',
    flexDirection: 'column',
    height: '60%',
    width: '100%',
    alignSelf: 'center',
  },
  center_text: {
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
  },
  contButton: {
    backgroundColor: '#ade8f4',
    height: '7%',
    width: '21%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderWidth: 1,
  }
});