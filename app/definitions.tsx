import { Text, View, StyleSheet, Button } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

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
            {/*div containing definition and usage*/}
            <View>

                {/*definition */}
                <View>

                </View>

                {/*usage */}
                <View>

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
  },
  center_menu: {
    flexDirection: 'column',
    alignItems: "center",
    alignContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    width: '95%',
    height: '70%',
  },
});