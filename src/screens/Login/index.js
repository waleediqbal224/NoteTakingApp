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

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BACKGROUNG_COLOR,
  COLOR_WHITE,
  COLOR_BLACK,
} from "../../../res/drawables";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPressed = async () => {
    const auth = getAuth();
    if (email.includes("@") && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        ToastAndroid.show("Logged In", ToastAndroid.SHORT);
        //alert("Logged In");
        props.navigation.replace("Main", { email: email });
      } catch (error) {
        alert(error.code);
      }
    } else {
      alert("Kindly enter email and password");
    }
  };

  const resetPassword = async () => {
    const auth = getAuth();
    if (email.includes("@")) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Reset email sent");
      } catch (error) {
        alert(error.code);
      }
    } else {
      alert("Enter valid email");
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
            onLoginPressed();
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>Login</Text>
        </Pressable>
      </View>
      <View style={{ alignSelf: "center", padding: 10 }}>
        <Pressable
          style={{ alignSelf: "center", marginBottom: 10 }}
          onPress={() => {
            resetPassword();
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>
            Forgot Password?
          </Text>
        </Pressable>
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          <Text style={{ color: "#3366ff", fontWeight: "bold" }}>
            Doesn't have an account?
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

export default Login;
