import React from 'react'
import {Button, View, Text} from 'react-native'

function Login({navigation}) {
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title='Login' onPress={() => navigation.navigate('list')}/>
        <Button title='Sign Up'/> 
    </View>
  )
}

export default Login


