import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../user_profile/user_context';
import { Text, View, StyleSheet, Pressable, TextInput, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useRoute } from '@react-navigation/native'

interface PostData {
  habit_name: string,
  habit_category: string,
  habit_type: string,
  habit_streak: number,
  user_id: number,
}
interface HabitProps {
  user_id: number;
  userHabits: any;
  setUserHabits: any;
}


export const PostHabit = () => {
  const { user_id } = useContext(UserContext);
  const route = useRoute()
  const { userHabits, setUserHabits } = route.params as HabitProps;
  const habitCategory = ['Exercise', 'Food', 'Sleep']
  const habitType = ['Daily', 'Weekly', 'Monthly']
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [streak, setStreak] = useState(0)


  const handlePost = () => {
    const postRequest = async (): Promise<void> => {
      try {
        const response = await axios.post(
          `https://final-api.onrender.com/habits/`, {
          habit_name: name,
          habit_category: category,
          habit_type: type,
          habit_streak: streak,
          user_id: user_id
        }
        )
        console.log(response.status)
        console.log(response.data)
        setUserHabits((currHabits: any) => {
          return [response.data, ...currHabits]
        })
      } catch (error) {
        console.error("this is the post error", error)
      }
    }
    postRequest()
  }

  return (
    <View style={styles.top}>
      <TextInput
        placeholder='habit name'
        style={{ borderWidth: 2, borderColor: 'skyblue', margin: 20 }}
        onChangeText={(text) => setName(text)}
      />
      <SelectDropdown
        data={habitType}
        buttonStyle={styles.title}
        defaultButtonText='Type'
        onSelect={(selectedItem, index) => {
          setType(selectedItem)
        }}
      />
      <SelectDropdown
        data={habitCategory}
        buttonStyle={styles.title}
        defaultButtonText='Category'
        onSelect={(selectedItem, index) => {
          setCategory(selectedItem)
        }}
      />
      <Button title='Add' onPress={() => { handlePost() }} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 100,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,

  },
  top: {
    marginTop: 120
  }
})

export default PostHabit

