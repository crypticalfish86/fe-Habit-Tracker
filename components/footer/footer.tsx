import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

export const Footer = () =>
{
    return(
        <View>
            <Button title='Profile' />
            <Button title='List' />
            <Button title='Rewards' />
            <Button title='Information' />
        </View>

    )
}