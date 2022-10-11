import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const ImageButton = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <Image style={{ ...styles.img, ...props.style }} source={props.source} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 60,
    width: 60,
  },
});

export default ImageButton;
