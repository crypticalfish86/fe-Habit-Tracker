import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./components/login_page/login";
import { Card } from "./components/habit_card/card";
import TabNavBar from "./components/navigation/TabNavBar";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavBar"
          component={TabNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="card"
          component={Card}
          options={{ title: "card" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
