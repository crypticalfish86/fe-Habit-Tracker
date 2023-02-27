import React, {useEffect, useState} from 'react'
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native'
import { Footer } from '../footer/footer'
import axios, {AxiosResponse} from 'axios'

interface Habits {
    habit_name : string,
    habit_category: string,
    habit_type: string,
    habit_streak: number;
    user_id: number;
}


export const List = ({navigation} :any) => {
    const [userHabits, setUserHabits] = useState<Habits[]>([])

    useEffect(() => {
        axios.get<Habits[]>('https://final-api.onrender.com/habits/')
        .then((response : AxiosResponse<Habits[]>) => {
            setUserHabits(response.data)
        })
        .catch((error :any) => {
            console.log(error)
        })   
    }, [])


  return (
    // need to workout how to give individual keys (user_id is duplicated and complains when we try to use index)
    <View>
        {userHabits.map(habit =>(
            <Text key={habit.user_id}>{habit.habit_name}</Text>
        ))}
    <View>
    <Footer navigation={navigation}/>
    </View>
    </View>


//     <View>
//         {[userHabits]}
//    </View>

  )
}

    
