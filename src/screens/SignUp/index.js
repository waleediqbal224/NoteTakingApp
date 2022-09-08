import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Pressable,
  ToastAndroid,
  Image,
} from "react-native";

import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpPressed = async () => {
    const auth = getAuth();
    if (email.includes("@") && password) {
      try {
        let user = await createUserWithEmailAndPassword(auth, email, password);
        ToastAndroid.show("User created successfully", ToastAndroid.LONG);
        props.navigation.goBack();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Enter email and password");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Image
        style={{ marginTop: 200, width: 100, height: 100, alignSelf: "center" }}
        source={require("../../../assets/logo.png")}
      ></Image>
      <TextInput
        style={styles.textFields}
        placeholder="Enter email"
        onChangeText={(t) => setEmail(t)}
      />
      <TextInput
        style={styles.textFields}
        placeholder="Enter password"
        onChangeText={(t) => setPassword(t)}
        secureTextEntry={true}
      />

      <View style={{ ...styles.card, alignSelf: "center", padding: 10 }}>
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            onSignUpPressed();
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>Signup</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: "#3366ff",
              fontWeight: "bold",
            }}
          >
            Already have an account?
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Login
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
  textFields: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default SignUp;
