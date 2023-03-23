import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from '../user_profile/user_context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faGift,
  faList,
  faUser,
  faStar,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

import { Habits } from '../habits/habits';
import { Rewards } from '../reward_page/rewards';
import Achievements from '../achievements/achievements';
import { Profile } from '../user_profile/profile';
import { Login } from '../login_page/login';

const habitName = 'Habits';
const achieveName = 'Achievements';
const profileName = 'Profile';
const rewardName = 'Rewards';
const loginName = 'Login!';

const Tab = createBottomTabNavigator();

export default function TabNavBar() {
  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName={loginName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === habitName) {
            iconName = focused ? faList : faList;
          } else if (rn === achieveName) {
            iconName = focused ? faStar : faStar;
          } else if (rn === profileName) {
            iconName = focused ? faUser : faUser;
          } else if (rn === rewardName) {
            iconName = focused ? faGift : faGift;
          } else if (rn === loginName) {
            iconName = focused ? faRightToBracket : faRightToBracket;
          }

          return <FontAwesomeIcon icon={iconName} size={18} color={color} />;
        },

        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 80 },
      })}
    >
      <Tab.Screen
        name={habitName}
        component={Habits}
        initialParams={{ user_id: 9 }}
        options={{ title: 'Your Habits' }}
      />
      <Tab.Screen
        name={achieveName}
        component={Achievements}
        options={{ title: 'Achievements' }}
      />
      <Tab.Screen
        name={profileName}
        component={Profile}
        options={{ title: `Home Page` }}
      />
      <Tab.Screen
        name={rewardName}
        component={Rewards}
        options={{ title: 'Your Rewards' }}
      />
      <Tab.Screen
        name={loginName}
        component={Login}
        options={{
          headerShown: false,
          title: user ? user.split(' ')[0] : 'Log in',
          tabBarIcon: ({ focused, color }) => {
            let iconName = user ? faRightFromBracket : faRightToBracket;
            return <FontAwesomeIcon icon={iconName} size={18} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
