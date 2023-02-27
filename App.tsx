import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './components/login_page/login'
import { List } from './components/habit_list/list'
import { Card } from './components/habit_card/card';
import { Rewards } from './components/reward_page/rewards';
import { Profile } from './components/user_profile/profile';



export default function App() {

const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='login' component={Login} options={{title : 'login'}}/>
        <Stack.Screen name='list' component={List} options={{title : 'list'}}/>
        <Stack.Screen name ='card' component={Card} options={{title : 'card'}}/>
        <Stack.Screen name ='rewards' component={Rewards} options={{title : 'rewards'}}/>
        <Stack.Screen name ='profile' component={Profile} options={{title : 'profile'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
