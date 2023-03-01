import axios from 'axios';
import React, {useState} from 'react'
import { Text, View, StyleSheet, Pressable, TextInput, Button } from 'react-native';

interface PostData {
    habit_name: string,
    habit_category: string,
    habit_type: string,
    habit_streak: number,
    user_id: number,
}


export const PostHabit = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [streak, setStreak] = useState(0)
    const [userID, setUserID] = useState(0)


   const handlePost = () => {
        const postRequest = async (): Promise<void> => {
            try {
                const response = await axios.post(
                    `https://final-api.onrender.com/habits/`, {
                        habit_name: name,
                        habit_category: category,
                        habit_type: type,
                        habit_streak: streak,
                        user_id: userID
                    }
                )
                console.log(response.status)
                console.log(response.data)
            } catch (error) {
                console.error("this is the post error", error)
            }
        }
        postRequest()
   }
   
   

  return (
    <View>
        <TextInput 
      placeholder='habit name'
      style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
      onChangeText={(text) => setName(text)}
      />
      <TextInput 
      placeholder='habit category'
      style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
      onChangeText={(text) => setCategory(text)}
      />
      <TextInput 
      placeholder='habit type'
      style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
      onChangeText={(text) => setType(text)}
      />
      <TextInput 
      placeholder='user ID'
      style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
      onChangeText={(text) => setUserID(+text)}
      />
      <Button title='Add' onPress={() => {handlePost()}}/>
    </View>
  )
}

export default PostHabit

