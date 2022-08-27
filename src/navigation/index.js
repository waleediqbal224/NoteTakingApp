import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/Splash";
import Main from "../screens/Main";
import CreateNote from "../screens/CreateNote";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center" }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center" }}
          name="Create"
          component={CreateNote}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigation;
