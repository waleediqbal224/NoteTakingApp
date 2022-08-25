import react from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BACKGROUNG_COLOR } from "../../../res/drawables";

const Splash = (props) => {
  setTimeout(() => {
    props.navigation.replace("Main");
  }, 3000);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUNG_COLOR,
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default Splash;
