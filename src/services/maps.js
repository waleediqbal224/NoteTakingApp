import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

import firebaseApp from "../../api/firebase";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  onSnapshot,
  QuerySnapshot,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

export default function MapLoation(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
    //SETTING  TIME INTERVAL
    const interval = setInterval(() => {
      addCoordinates();
    }, 10000);
    return () => clearInterval(interval);
    //
  }, []);

  //Listening to location changes
  Location.watchPositionAsync(
    {
      enableHighAccuracy: true,
      timeInterval: 2000,
    },
    (location) => {
      setLocation(location);
    }
  );

  const addCoordinates = async () => {
    try {
      const docRef = await addDoc(collection(db, "Coordinates"), {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 29.382941,
          longitude: 71.7159957,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location ? (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Me"}
            description={"it is my city"}
          />
        ) : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
