import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./components/login_page/login";
import { Card } from "./components/habit_card/card";
import { CardEditor} from "./components/habit_card/cardEditor"
import { List} from './components/habit_list/list'
import TabNavBar from "./components/navigation/TabNavBar";
import { Profile } from "./components/user_profile/profile";
import PostHabit from "./components/habit_card/postHabit";

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
          name="profile"
          component={Profile}
          options={{ title: "user page" }}
        />
        <Stack.Screen
          name="cardEditor"
          component={CardEditor}
          options={{ title: "Update" }}
        />
        <Stack.Screen
          name="card"
          component={Card}
          options={{ title: "card" }}
        />
        <Stack.Screen
          name='list'
          component={List}
          options={{title: 'Habits'}}
          />
        <Stack.Screen
          name='postHabit'
          component={PostHabit}
          options={{title: 'Add a new habit'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
