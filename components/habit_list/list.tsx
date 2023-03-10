import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../user_profile/user_context'
import { Text, View, Button, ScrollView, StyleSheet, Pressable } from 'react-native'
import axios, { AxiosResponse } from 'axios'
import uuid from 'react-uuid'
import { Card } from '../habit_card/card'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export interface Habits {
  id: number,
  habit_name: string,
  habit_category: string,
  habit_type: string,
  habit_streak: number;
  user_id: number;
}

interface HabitProps {
  user_id: number;
}


export const List = ({ navigation }: any) => {
  const { user_id } = useContext(UserContext)
  const [userHabits, setUserHabits] = useState<Habits[]>([])

  useEffect(() => {
    axios.get<Habits[]>(`https://final-api.onrender.com/users/${user_id}/habits`)
      .then((response: AxiosResponse<Habits[]>) => {
        setUserHabits(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [user_id])

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E8F8F5'}}>
      <View>
        <Pressable onPress={() => navigation.navigate('postHabit', {
          user_id: user_id,
          setUserHabits: setUserHabits,
          userHabits: userHabits

        })}>
          <FontAwesomeIcon
            icon={faPlus}
            size={24}
            style={styles.modalToggle} />

        </Pressable>
        {userHabits.map((habit: Habits) => (
          <Card
            key={uuid()}
            id={habit.id}
            habit_name={habit.habit_name}
            habit_category={habit.habit_category}
            habit_type={habit.habit_type}
            habit_streak={habit.habit_streak}
            user_id={user_id}
            userHabits={userHabits}
            setUserHabits={setUserHabits}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 65,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});