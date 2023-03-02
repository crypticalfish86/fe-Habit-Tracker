import React , {useContext, useState} from "react"
import { Text, View, StyleSheet, Pressable, TouchableOpacity, TouchableHighlight } from "react-native"
// import {NavigationContainer, StackActions} from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEraser,
  faPen,
  faCircleDollarToSlot,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios, {AxiosResponse} from 'axios'
import { UserContext } from "../user_profile/user_context";



interface HabitCardProps {
    id: number;
    habit_name: string;
    habit_category: string;
    habit_type: string;
    habit_streak: number;
    user_id: number;
    userHabits: any;
    setUserHabits: any;
}

interface UpdatedData {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
}



export const Card = ( props: HabitCardProps) => {
const {id, habit_name, habit_category, habit_type, habit_streak, user_id, userHabits, setUserHabits} = props
const navigation = useNavigation()

// const [singleCard, setSingleCard] = useState<UpdatedData[]>([])

const handleDelete = () => {
  const { user_id } = useContext(UserContext);
  setUserHabits((prevHabits: any) => {
    return prevHabits.filter((habit:any) => {
      return !(habit.id === id && habit.user_id === user_id && habit.habit_name === habit_name)
    })
 })

 return axios.delete(`https://final-api.onrender.com/habits/${id}/`)
 .then(response => {
   console.log('Delete successful', response.data);
   console.log(response.status)
 })
 .catch(error => {
   console.log('Delete failed', error);
 })
}



const handleCheck = ({habit_streak, id}:any, Body: Body) => {
  console.log(JSON.stringify(Body))
  axios.patch<UpdatedData>(`https://final-api.onrender.com/habits/${id}/`, {
    habit_streak :(habit_streak) + 1
  })
      .then((response: AxiosResponse<UpdatedData>) => {
        console.log('Update successful', response.data);
        console.log(response.status);
      })
      .catch((error: any) => {
        console.error('Update failed>>>>>>>', error);
        console.log(error.message)
      });
}



    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>Habit: {habit_name}</Text>
                <Text>Category: {habit_category}</Text>
                <Text>Type: {habit_type}</Text>
                <Text>Streak: {habit_streak}</Text>
                <View style={styles.buttoncontainer}>
                  <Pressable
                  id='edit'
                  style={styles.button}
                  onPress={() => navigation.navigate('cardEditor', {
                    id: {id},
                    habit_name: {habit_name},
                    habit_category: {habit_category},
                    habit_streak: {habit_streak},
                    habit_type: {habit_type},
                    user_id : {user_id}
                  })}
                  >
                  <FontAwesomeIcon icon={faPen} size={20}/>  
                  </Pressable>
                  <Pressable
                  id="delete"
                  style={styles.button}
                  onPress={() => {
                    handleDelete()
                  }}
                  >
                    <FontAwesomeIcon icon={faEraser} size={20}/>
                  </Pressable>
                  <Pressable
                  id='check'
                  style={styles.button}
                  onPress={() => {
                    handleCheck({id, habit_streak})
                  }}
                  >
                    <FontAwesomeIcon icon={faCheck} size={20}/>
                  </Pressable>

                </View>
            </View>
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
      marginHorizontal:5,
    },
    buttontext: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  buttoncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  });


  