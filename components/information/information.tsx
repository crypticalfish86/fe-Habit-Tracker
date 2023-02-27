import React from 'react'
import {Text, View} from 'react-native'
import { Footer } from '../footer/footer'

const Information = ({navigation} : any) => {
  return (
    <View>
    <Text>Information</Text>
    <Footer navigation={navigation}/>
    </View>
  )
}

export default Information