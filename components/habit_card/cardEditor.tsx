// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Pressable, TextInput, Button } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import { useNavigation } from '@react-navigation/native';
// // import { faStoreAlt } from '@fortawesome/free-solid-svg-icons';
// import axios, {AxiosResponse} from 'axios';
// import SelectDropdown from 'react-native-select-dropdown'

// interface UpdatedData {
//   id: number;
//   habit_name: string;
//   habit_category: string;
//   habit_type: string;
//   habit_streak: number;
//   user_id: number;
// }

// export const CardEditor = ({route}:any, {navigation} : any) => {

//   const habitCategory = ['Exercise', 'Food', 'Sleep']
//   const habitType = ['Daily', 'Weekly', 'Monthly']

//   const {habit_name, habit_category, habit_type,id, habit_streak, user_id} = route.params
//   const [name, setName] = useState(habit_name.habit_name)
//   const [category, setCategory] = useState(habit_category.habit_category)
//   const [type, setType] = useState(habit_type.habit_type)

//   const habitStreak = +JSON.stringify(habit_streak.habit_streak)
//   const [streak, setStreak] = useState(habitStreak)

//   const habitUserID = +JSON.stringify(user_id.user_id)
//   const [userID, setUserID] = useState(habitUserID)

//   const habitid2 = +JSON.stringify(id.id)
//   const [habitID, setHabitID] = useState(habitid2)

//   const [remove, setRemove] = useState(false)

//   const [data, setData] = useState<UpdatedData>({id: habitID, habit_name: name, habit_category : category, habit_type: type, habit_streak: streak, user_id: userID})

//   useEffect(() => {
//     axios.patch<UpdatedData>(`https://final-api.onrender.com/habits/${habitID}/`, data)
//       .then((response: AxiosResponse<UpdatedData>) => {
//         console.log('Update successful', response.data);
//         console.log(response.status);
//       })
//       .catch((error: any) => {
//         console.error('Update failed>>>>>>>', error);
//         console.log(error.message)
//       });
//   }, [data]);

//   const handleSubmit = () => {

//     setData({ id: habitID, habit_name: name, habit_category: category, habit_type: type, habit_streak: streak, user_id: userID });
//   };

//   // const handleDelete = () => {

//   //     axios.delete(`https://final-api.onrender.com/habits/${habitID}/`)
//   //     .then(response => {
//   //       console.log('Delete successful', response.data);
//   //       console.log(response.status)
//   //     })
//   //     .catch(error => {
//   //       console.log('Delete failed', error);
//   //     })

//   // }

//   return (
//     <View style={{margin: 20, marginTop: 100}}>
//       <TextInput
//       placeholder='Edit Habit Name'
//       style={{borderWidth: 2, borderColor: 'skyblue', margin:20}}
//       onChangeText={(text) => setName(text)}
//       />
//          <SelectDropdown
//       data={habitType}
//       buttonStyle={styles.title}
//       defaultButtonText='Edit Type'
//       onSelect={(selectedItem, index) => {
//         setType(selectedItem)
//       }}
//       />
//        <SelectDropdown
//       data={habitCategory}
//       buttonStyle={styles.title}
//       defaultButtonText='Edit Cat'
//       onSelect={(selectedItem, index) => {
//         setCategory(selectedItem)
//       }}
//       />
//       <Button title='Update Habit' onPress={() => {handleSubmit()}}/>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   title: {
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 8,
//     marginHorizontal: 80,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     elevation: 3,

//   }
// })

// export default CardEditor
