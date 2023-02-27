import React from 'react'
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native'
import { Footer } from '../footer/footer'


export const List = ({navigation} :any) =>
{
  return (
    <View>
      <Footer navigation={navigation}/>
    </View>

  )
}
