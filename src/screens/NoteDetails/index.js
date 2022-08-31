import React from "react";
import { View, Text } from "react-native";

const NoteDetails = (props) => {
  const { title, description } = props.route.params;
  console.log(props.route.params);
  console.log(title);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default NoteDetails;
