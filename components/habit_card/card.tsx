import React from "react"
import { Text, View, StyleSheet, Pressable } from "react-native"
import { useState } from "react"
import {NavigationContainer, StackActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


interface HabitCardProps {
    id: number;
    habit_name: string;
    habit_category: string;
    habit_type: string;
    habit_streak: number;
    user_id: number;
}

export const Card = (props: HabitCardProps) =>
{
const {id, habit_name, habit_category, habit_type, habit_streak, user_id} = props
const navigation = useNavigation()
    return(
        <View style={styles.card}>
            <Pressable 
            onPress={() => navigation.navigate('login')}
            onLongPress={() => navigation.navigate('cardEditor', {
                id: {id},
                habit_name: {habit_name},
                habit_category: {habit_category},
                habit_streak: {habit_streak},
                habit_type: {habit_type},
                user_id : {user_id}
            })}
            >
            <View style={styles.cardContent}>
                <Text>Habit: {habit_name}</Text>
                <Text>Category: {habit_category}</Text>
                <Text>Type: {habit_type}</Text>
                <Text>Streak: {habit_streak}</Text>
            </View>
            </Pressable>
        </View>

    )

}


const styles = StyleSheet.create({
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: "#fff",
      shadowOffset: { width: 1, height: 1 },
      shadowColor: "#333",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      marginLeft: 15,
      marginRight: 15,
    },
    cardContent: {
      marginHorizontal: 24,
      marginVertical: 12,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      elevation: 3,
      backgroundColor: "black",
      marginLeft: 60,
      marginRight: 60,
    },
    buttontext: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });