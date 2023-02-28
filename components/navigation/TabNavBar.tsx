import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGift,
  faList,
  faUser,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { List } from "../habit_list/list";
import { Rewards } from "../reward_page/rewards";
import Information from "../information/information";
 import {Profile} from "../user_profile/profile";

const habitName = "Habits";
const infoName = "Information";
const profileName = "Profile";
const rewardName = "Rewards";

const Tab = createBottomTabNavigator();

export default function TabNavBar() {
  return (
    <Tab.Navigator
      initialRouteName={habitName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === habitName) {
            iconName = focused ? faList : faList;
          } else if (rn === infoName) {
            iconName = focused ? faQuestion : faQuestion;
          } else if (rn === profileName) {
            iconName = focused ? faUser : faUser;
          } else if (rn === rewardName) {
            iconName = focused ? faGift : faGift;
          }

          return <FontAwesomeIcon icon={iconName} size={32} color={color} />;
        },
      })}
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 80 },
      }}
    >
      <Tab.Screen
        name={habitName}
        component={List}
        options={{ title: "Your Habits" }}
      />
      <Tab.Screen
        name={infoName}
        component={Information}
        options={{ title: "Help Page" }}
      />
      <Tab.Screen
        name={profileName}
        component={Profile}
        options={{ title: "User Profile" }}
      />
      <Tab.Screen
        name={rewardName}
        component={Rewards}
        initialParams={{ user_id: 7 }}
        options={{ title: "Your Rewards" }}
      />
    </Tab.Navigator>
  );
}
