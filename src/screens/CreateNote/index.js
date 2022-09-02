import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  ToastAndroid,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

const CreateNote = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onAddPressed = async () => {
    if (title != "" && description != "") {
      try {
        let value = await AsyncStorage.getItem(title);
        if (value) {
          ToastAndroid.show("Title already exists", ToastAndroid.LONG);

          //alert("Title already exists");
        } else {
          await AsyncStorage.setItem(title, description);
          // setTitle("");
          // setDescription("");
          //alert("Note saved");
          ToastAndroid.show("Note saved", ToastAndroid.SHORT);
          props.navigation.navigate("Main");
          //props.navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastAndroid.show("Add title and description", ToastAndroid.LONG);
      //alert("Kindly add title and description");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={{ ...styles.card, height: "7%" }}>
        <TextInput
          style={{ padding: 10 }}
          placeholder="Enter title here"
          onChangeText={(t) => setTitle(t)}
        />
      </View>
      <View style={{ ...styles.card, height: "30%" }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder="Enter description here"
          onChangeText={(t) => setDescription(t)}
          multiline={true}
        />
      </View>
      <View style={{ ...styles.card, alignSelf: "center", padding: 10 }}>
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            onAddPressed();
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>Add Note</Text>
        </Pressable>
      </View>
      {/* <View style={styles.button}>
        <Button title="Add Note" onPress={() => onAddPressed()} />
      </View> */}
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

export default CreateNote;
