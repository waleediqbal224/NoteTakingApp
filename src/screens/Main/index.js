import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ADD_BUTTON_IMG, NOTE_IMG, CLEAR_IMG } from "../../../res/drawables";
import ImageButton from "../../components/ImageButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadAllKeyFromAsyncStorage();
  }, [data]);

  const loadAllKeyFromAsyncStorage = async () => {
    let keys = await AsyncStorage.getAllKeys();
    setData(keys);
    //console.log(keys);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                let title = item;
                //let description = await AsyncStorage.getItem(item);
                //props.navigation.navigate("Details", { title, description });
                props.navigation.navigate("Update", title);
              }}
            >
              <View style={{ margin: 5 }}>
                <Image style={styles.noteIcon} source={NOTE_IMG} />
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
      />
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
