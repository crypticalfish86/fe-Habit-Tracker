import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

export const Footer = ({navigation} : any) =>
{
    return(
        <View>
            <Button title='Profile' onPress={() => navigation.navigate('profile')} />
            <Button title='List' onPress={() => navigation.navigate('list')} />
            <Button title='Rewards' onPress={() => navigation.navigate('rewards')} />
            <Button title='Information' onPress={() => navigation.navigate('information')} />
        </View>

    )
}