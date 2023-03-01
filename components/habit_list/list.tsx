import React, {useEffect, useState} from 'react'
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native'
import axios, {AxiosResponse} from 'axios'
import uuid from 'react-uuid'
import {Card} from '../habit_card/card'

interface Habits {
    id: number,
    habit_name : string,
    habit_category: string,
    habit_type: string,
    habit_streak: number;
    user_id: number;
}


export const List = ({navigation} :any, {route}: any) => {

    const [userHabits, setUserHabits] = useState<Habits[]>([])

    useEffect(() => {
        axios.get<Habits[]>('https://final-api.onrender.com/habits/')
        .then((response : AxiosResponse<Habits[]>) => {
            setUserHabits(response.data)
        })
        .catch((error :any) => {
            console.log(error)
        })   
    }, )





  return (
    // need to workout how to give individual keys (user_id is duplicated and complains when we try to use index)
      <ScrollView>
          <View>
              {userHabits.map((habit: Habits) => (
                  <Card
                      key={uuid()}
                      id={habit.id}
                      habit_name={habit.habit_name}
                      habit_category={habit.habit_category}
                      habit_type={habit.habit_type}
                      habit_streak={habit.habit_streak}
                      user_id={habit.user_id}
                  />
              ))}
              <Button title='add habit' onPress={() => navigation.navigate('postHabit')} />
          </View>
      </ScrollView>


//     <View>
//         {userHabits}
//    </View>

  )
}