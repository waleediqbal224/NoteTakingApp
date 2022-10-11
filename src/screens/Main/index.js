import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
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
import {
  collection,
  getDocs,
  getFirestore,
  query,
  onSnapshot,
  QuerySnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import axios from "axios";
import { getWeatherOfCity } from "../../services/weather";

const Main = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { email } = props.route.params;

  useEffect(() => {
    loadData();
  }, []);

  const db = getFirestore(firebaseApp);

  const loadData = async () => {
    let keys = [];
    setLoading(true);
    //WEATHER API
    alert(await getWeatherOfCity("Bahawalpur"));
    //REALTIME DATABASE
    const q = query(collection(db, email));
    try {
      const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          keys.push(doc.data());
        });
        setData(keys);
        setLoading(false);
        keys = [];
        //unsub();
      });
      // console.log("keys are:" + keys);
    } catch (e) {}

    // const querySnapshot = await getDocs(collection(db, email));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   keys.push(doc.data());
    // });
  };

  const deleteNote = async (item) => {
    await deleteDoc(doc(db, email, item));
  };

  // useEffect(() => {
  //   loadAllKeyFromAsyncStorage();
  // }, [data]);

  // const loadAllKeyFromAsyncStorage = async () => {
  //   let keys = await AsyncStorage.getAllKeys();
  //   setData(keys);
  // };

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // };

  // const deleteNote = async (item) => {
  //   AsyncStorage.removeItem(item);
  //   ToastAndroid.show("Deleted", ToastAndroid.LONG);
  // };

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : null}

      {data.length != 0 ? (
        <FlatList
          data={data}
          numColumns={4}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  let noteTitle = item.title;
                  let noteDescription = item.description;
                  props.navigation.navigate("Update", {
                    noteTitle,
                    noteDescription,
                    email,
                  });
                }}
              >
                <View style={{ margin: 5 }}>
                  <TouchableOpacity onPress={() => deleteNote(item.title)}>
                    <Image
                      style={styles.deleteIcon}
                      source={DELETE_ICON}
                      alignSelf="flex-end"
                    />
                  </TouchableOpacity>
                  <Image style={styles.noteIcon} source={NOTE_IMG} />
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      ) : !isLoading ? (
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
      ) : null}

      <View style={styles.icons_container}>
        {/* <ImageButton source={CLEAR_IMG} onPress={() => clearAsyncStorage()} /> */}
        <ImageButton
          source={ADD_BUTTON_IMG}
          onPress={() => props.navigation.navigate("Create", { email })}
        />
        <ImageButton
          source={CLEAR_IMG}
          onPress={() => props.navigation.navigate("Map")}
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
    //justifyContent: "flex-end",
    margin: 10,
  },
});

export default Main;
