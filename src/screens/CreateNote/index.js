import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ ...styles.card, height: "8%" }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder="Enter title here"
          onChangeText={(t) => setTitle(t)}
        />
      </View>
      <View style={{ ...styles.card, height: "70%" }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder="Enter description here"
          onChangeText={(t) => setDescription(t)}
          multiline={true}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <Button title="Add Note" onPress={() => alert("Added")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNG_COLOR,
  },
  card: {
    backgroundColor: COLOR_WHITE,
    borderRadius: 20,
    margin: 10,
    shadowColor: COLOR_BLACK,
    elevation: 10,
    borderColor: COLOR_BLACK,
    borderWidth: 0.5,
  },
});

export default CreateNote;
