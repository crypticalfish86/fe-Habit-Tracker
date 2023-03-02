import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { UserContext } from '../user_profile/user_context';
import axios, {AxiosResponse} from 'axios';
import {Habits} from '../habit_list/list'



interface UpdatedData {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
}
interface HabitCardProps {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
  userHabits: Habits[];
  setUserHabits: React.Dispatch<React.SetStateAction<Habits[]>>
}


export const CardEditor = ({route}:any, {navigation} : any) => {

  const habitCategory = ['Exercise', 'Food', 'Sleep']
  const habitType = ['Daily', 'Weekly', 'Monthly']

  const { user_id } = useContext(UserContext);
  const {habit_name, habit_category, habit_type,id, habit_streak, userHabits, setUserHabits} = route.params
  const [name, setName] = useState(habit_name.habit_name)
  const [category, setCategory] = useState(habit_category.habit_category)
  const [type, setType] = useState(habit_type.habit_type)

  const habitStreak = +JSON.stringify(habit_streak.habit_streak)
  const [streak, setStreak] = useState(habitStreak)

  const habitid2 = +JSON.stringify(id.id)
  const [habitID, setHabitID] = useState(habitid2)


  const [data, setData] = useState<UpdatedData>({id: habitID, habit_name: name, habit_category : category, habit_type: type, habit_streak: streak, user_id: user_id})



  useEffect(() => {
    
   
    axios.patch<UpdatedData>(`https://final-api.onrender.com/habits/${habitID}/`, data)
      .then((response: AxiosResponse<UpdatedData>) => {
        console.log('Update successful', response.data);
        console.log(response.status);
      })
      .catch((error: any) => {
        console.error('Update failed>>>>>>>', error);
        console.log(error.message)
      });
  }, [data]);
  
  const handleSubmit = () => {
    
    // setUserHabits((currHabits:any) => {
    //   return currHabits.map((habit:any) => {
    //     if (habit.id === habitID){
           
    //     }
    //   })
    // })

    setData({ id: habitID, habit_name: name, habit_category: category, habit_type: type, habit_streak: streak, user_id: user_id });
  };


  return (
    <View style={{margin: 20, marginTop: 100}}>
      <TextInput 
      placeholder='Edit Habit Name'
      style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
      onChangeText={(text) => setName(text)}
      />
         <SelectDropdown
      data={habitType}
      buttonStyle={styles.title}
      defaultButtonText='Edit Type'
      onSelect={(selectedItem, index) => {
        setType(selectedItem)
      }}
      />
       <SelectDropdown
      data={habitCategory}
      buttonStyle={styles.title}
      defaultButtonText='Edit Cat'
      onSelect={(selectedItem, index) => {
        setCategory(selectedItem)
      }}
      />
      <Button title='Update Habit' onPress={() => {handleSubmit()}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 80,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,

  }
})

export default CardEditor