import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './components/login_page/login';
import SplashScreen from './components/login_page/splashscreen';
import TabNavBar from './components/navigation/TabNavBar';
import { Profile } from './components/user_profile/profile';
import { UserProvider } from './components/user_profile/user_context';
import { Habits } from './components/habits/habits';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Splash'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Splash' component={SplashScreen} />
          <Stack.Screen
            name='TabNavBar'
            component={TabNavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='login'
            component={Login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name='profile'
            component={Profile}
            options={{ title: 'Personal' }}
          />
          <Stack.Screen
            name='habits'
            component={Habits}
            options={{ title: 'Habits' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
