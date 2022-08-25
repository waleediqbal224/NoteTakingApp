import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ADD_BUTTON_IMG } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";

const Main = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgBtn}>
        <ImageButton source={ADD_BUTTON_IMG} onPress={() => alert("Pressed")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBtn: {
    flex: 1,
    position: "absolute",
    left: 270,
    top: 600,
  },
});

export default Main;
