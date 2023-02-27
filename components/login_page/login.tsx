import React from 'react'
import {Button, View, Text} from 'react-native'
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export const Login = ({navigation} : any) =>
{
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title='Login' onPress={() => navigation.navigate('list')}/>
        <Button title='Sign Up'/> 
    </View>
  )
}


