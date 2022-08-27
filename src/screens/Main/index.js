import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ADD_BUTTON_IMG } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";

const Main = (props) => {
  return (
    <View style={styles.container}>
      <Text></Text>
      <ImageButton
        style={{
          alignSelf: "flex-end",
        }}
        source={ADD_BUTTON_IMG}
        onPress={() => props.navigation.navigate("Create")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  // imgBtn: {
  //   position: "absolute",
  //   bottom: 30,
  //   right: 30,
  // },
});

export default Main;
