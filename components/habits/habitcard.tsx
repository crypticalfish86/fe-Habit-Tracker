import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEraser, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Habits } from "./habits";

interface HabitCardProps {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
  userHabits: Habits[];
  setUserHabits: React.Dispatch<React.SetStateAction<Habits[]>>;
}

export const HabitCard = ({
  id,
  habit_name,
  habit_category,
  habit_type,
  habit_streak,
  user_id,
  userHabits,
  setUserHabits,
}: HabitCardProps) => {
  const deleteHabit = (event: any) => {
    setUserHabits((prevHabits: any) => {
      return prevHabits.filter((habit: any) => {
        return !(
          habit.id === id &&
          habit.user_id === user_id &&
          habit.habit_name === habit_name
        );
      });
    });

    return fetch(`https://final-api.onrender.com/habits/`)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .then((habits) => {
        const matchingHabit = habits.filter((habit: any) => {
          if (
            habit.habit_name === habit_name &&
            habit.id === id &&
            habit.user_id === user_id
          ) {
            return habit;
          }
        });
        const habitToDelete = matchingHabit[0];
        return fetch(
          `https://final-api.onrender.com/habits/${habitToDelete.id}`,
          {
            method: "DELETE",
          }
        );
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setUserHabits((prevHabits) => {
            return [
              ...prevHabits,
              {
                id,
                habit_name,
                habit_category,
                habit_type,
                habit_streak,
                user_id,
              },
            ];
          });
        }
      });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>Habit: {habit_name}</Text>
        <Text>Category: {habit_category}</Text>
        <Text>Type: {habit_type}</Text>
        <Text>Streak: {habit_streak}</Text>
        <View style={styles.buttoncontainer}>
          <Pressable
            id="delete"
            style={styles.button}
            onPress={(event) => {
              deleteHabit(event);
            }}
          >
            <FontAwesomeIcon icon={faEraser} size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

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
    marginHorizontal: 5,
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
