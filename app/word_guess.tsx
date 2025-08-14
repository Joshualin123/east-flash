import { Text, View, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

export default function Index() {

  return (
    //div encapsulating whole app
    <GestureHandlerRootView>
      <View
        style={styles.main_box}
      >
        {/*div containing centered menu */}
        <View style={styles.center_menu}>
          {/*div containing random kr word and textbox for typing your answer*/}
          <View style={styles.word_and_input}>

            {/*rand kr word */}
            <AutoSizeText fontSize={20} numberOfLines={3} mode={ResizeTextMode.max_lines} style={styles.hangul}>'길이 아니거든[아니면] 가지 말고 말이 아니거든[아니면] 듣지[탓하지] 말라'</AutoSizeText>

            <View style={styles.input_bar}>

              <TextInput style={{ flexGrow: 5 }} defaultValue='Enter romanization...'></TextInput>
              <Button title='Enter' />

            </View>{/* input bar */}

          </View>{/* rand word and input bar */}



        </View> {/* center box */}

      </View> {/* containing div */}
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
  },
  center_menu: {
    flexDirection: 'column',
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: '95%',
    height: '70%',
    paddingTop: '15%',
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
    backgroundColor: 'gray',
    height: '70%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  input_bar: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    borderColor: 'black',
    borderWidth: 1
  }
});