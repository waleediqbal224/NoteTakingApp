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

import firebaseApp from "../../../api/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

const UpdateNote = (props) => {
  let { noteTitle, noteDescription, email } = props.route.params;
  console.log(props.route.params);
  console.log(noteTitle);
  console.log(email);

  const [title, setTitle] = useState(noteTitle);
  const [description, setDescription] = useState(noteDescription);

  const auth = getAuth();
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (noteTitle) {
      let description = await AsyncStorage.getItem(noteTitle);
      setTitle(noteTitle);
      setDescription(noteDescription);
    }
  };

  const onUpdatePressed = async () => {
    if (title != "" && description != "") {
      try {
        const docRef = await setDoc(doc(db, email, title), {
          title: title,
          description: description,
        });

        ToastAndroid.show("Note saved", ToastAndroid.SHORT);
        props.navigation.goBack();
      } catch (e) {
        console.log(e);
      }
      //AsyncStorage
      // try {
      //   let value = await AsyncStorage.getItem(title);
      //   if (value) {
      //     await AsyncStorage.setItem(title, description);
      //     ToastAndroid.show("Updated!", ToastAndroid.SHORT);
      //     props.navigation.navigate("Main");
      //   }
      // } catch (e) {
      //   console.log(e);
      // }
    } else {
      ToastAndroid.show("Add title and description", ToastAndroid.LONG);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <TextInput
        style={{ ...styles.card, padding: 10 }}
        value={title}
        placeholder="Enter title here"
        editable={false}
        onChangeText={(t) => setTitle(t)}
      />
      <TextInput
        style={{
          ...styles.card,
          padding: 10,
          height: 200,
          textAlignVertical: "top",
        }}
        placeholder="Enter description here"
        value={description}
        onChangeText={(t) => setDescription(t)}
        multiline={true}
      />

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
