import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./components/login_page/login";
import SplashScreen from "./components/login_page/splashscreen";
import { Card } from "./components/habit_card/card";
import { CardEditor } from "./components/habit_card/cardEditor"
import { List } from './components/habit_list/list'
import TabNavBar from "./components/navigation/TabNavBar";
import { Profile } from "./components/user_profile/profile";
import PostHabit from "./components/habit_card/postHabit";
import { UserProvider } from "./components/user_profile/user_context";

interface UpdatedData {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
}

export default function App() {


  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
         initialRouteName="Splash"
         screenOptions={{
          headerShown: false
         }}>
          <Stack.Screen
          name ="Splash"
          component={SplashScreen}
          />
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
            name="profile"
            component={Profile}
            options={{ title: "Personal" }}
          />
          <Stack.Screen
            name='list'
            component={List}
            options={{ title: 'Habits' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
