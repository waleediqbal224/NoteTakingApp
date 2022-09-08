import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import {
  ADD_BUTTON_IMG,
  NOTE_IMG,
  CLEAR_IMG,
  DELETE_ICON,
} from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebaseApp from "../../../api/firebase";

const Main = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadAllKeyFromAsyncStorage();
  }, [data]);

  const loadAllKeyFromAsyncStorage = async () => {
    let keys = await AsyncStorage.getAllKeys();
    setData(keys);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const deleteNote = async (item) => {
    AsyncStorage.removeItem(item);
    ToastAndroid.show("Deleted", ToastAndroid.LONG);
  };

  return (
    <View style={styles.container}>
      {data.length != 0 ? (
        <FlatList
          data={data}
          numColumns={4}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  let title = item;
                  props.navigation.navigate("Update", title);
                }}
              >
                <View style={{ margin: 5 }}>
                  <TouchableOpacity onPress={() => deleteNote(item)}>
                    <Image
                      style={styles.deleteIcon}
                      source={DELETE_ICON}
                      alignSelf="flex-end"
                    />
                  </TouchableOpacity>
                  <Image style={styles.noteIcon} source={NOTE_IMG} />

                  <Text style={styles.text}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 20,
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#b30008",
            }}
          >
            Nothing to see here...
          </Text>
        </View>
      )}
      <View style={styles.icons_container}>
        <ImageButton source={CLEAR_IMG} onPress={() => clearAsyncStorage()} />
        <ImageButton
          source={ADD_BUTTON_IMG}
          onPress={() => props.navigation.navigate("Create")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  noteIcon: {
    height: 80,
    width: 80,
  },
  deleteIcon: {
    height: 30,
    width: 30,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    width: 80,
  },
  icons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default Main;
