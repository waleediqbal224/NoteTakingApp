import React, { useState } from "react";
import {
  View,
  Text,
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

import firebaseApp from "../../../api/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const CreateNote = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const db = getFirestore(firebaseApp);

  const onAddPressed = async () => {
    if (title != "" && description != "") {
      //setdoc is used to define your own documentId
      try {
        await setDoc(doc(db, "Notes", title), { description });
      } catch (e) {}

      //Cloud Firestore
      // try {
      //   const docRef = await addDoc(collection(db, "Notes"), {
      //     Title: title,
      //     Description: description,
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }

      //ASYNC STORAGE
      try {
        let value = await AsyncStorage.getItem(title);
        if (value) {
          ToastAndroid.show("Title already exists", ToastAndroid.LONG);
        } else {
          await AsyncStorage.setItem(title, description);
          ToastAndroid.show("Note saved", ToastAndroid.SHORT);
          props.navigation.navigate("Main");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastAndroid.show("Add title and description", ToastAndroid.LONG);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <TextInput
        style={{ ...styles.card, padding: 10 }}
        placeholder="Enter title here"
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
        onChangeText={(t) => setDescription(t)}
        multiline={true}
      />
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
