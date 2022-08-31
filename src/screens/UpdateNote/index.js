import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

const UpdateNote = (props) => {
  let noteTitle = props.route.params;
  console.log(props.route.params);
  console.log(noteTitle);
  const [title, setTitle] = useState(noteTitle);
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (noteTitle) {
      let description = await AsyncStorage.getItem(noteTitle);
      setTitle(noteTitle);
      setDescription(description);
    }
  };

  const onUpdatePressed = async () => {
    if (title != "" && description != "") {
      try {
        let value = await AsyncStorage.getItem(title);
        if (value) {
          await AsyncStorage.setItem(title, description);
          alert("Note Updated");
          props.navigation.navigate("Main");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Kindly add title and description");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={{ ...styles.card, height: "7%" }}>
        <TextInput
          value={title}
          style={{ padding: 10 }}
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
          value={description}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <Button title="Update Note" onPress={() => onUpdatePressed()} />
      </View>
    </KeyboardAvoidingView>
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

export default UpdateNote;
