import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
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
          //alert("Updated");
          ToastAndroid.show("Updated!", ToastAndroid.SHORT);
          props.navigation.navigate("Main");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      //alert("Kindly add title and description");
      ToastAndroid.show("Add title and description", ToastAndroid.LONG);
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
      <View style={{ ...styles.card, height: "30%" }}>
        <TextInput
          style={{ margin: 10 }}
          placeholder="Enter description here"
          onChangeText={(t) => setDescription(t)}
          multiline={true}
          value={description}
        />
      </View>
      <View style={{ ...styles.card, alignSelf: "center", padding: 10 }}>
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            onUpdatePressed();
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>
            Update Note
          </Text>
        </Pressable>
      </View>
      {/* <View style={styles.button}>
        <Button title="Update Note" onPress={() => onUpdatePressed()} />
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

export default UpdateNote;
