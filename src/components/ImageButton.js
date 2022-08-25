import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ImageButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <Image style={styles.img} source={props.source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
  },
});

export default ImageButton;
