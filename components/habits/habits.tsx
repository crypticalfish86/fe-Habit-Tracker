import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import uuid from "react-uuid";
import { HabitCard } from "./habitcard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";
import { globalStyles } from "../../styles/styles";
import { HabitForm } from "./habitsform";

interface Body {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
}

export interface Habits {
  id: number;
  habit_name: string;
  habit_category: string;
  habit_type: string;
  habit_streak: number;
  user_id: number;
}

interface HabitsProps {
  user_id: number;
}

export const Habits = () => {
  const route = useRoute();
  const { user_id } = route.params as HabitsProps;
  const [modalOpen, setModalOpen] = useState(false);
  const [userHabits, setUserHabits] = useState<Habits[]>([]);

  useEffect(() => {
    fetch(`https://final-api.onrender.com/users/${user_id}/habits`)
      .then((response) => {
        const habitsJSON = response.json();
        return habitsJSON;
      })
      .then((habitsJSON) => {
        setUserHabits(habitsJSON);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const postHabit = async (Body: Body) => {
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Body),
    };
    try {
      const response = await fetch(
        `https://final-api.onrender.com/habits/`,
        requestBody
      );
      const data = await response.json();
      setUserHabits((currHabits) => {
        return [data, ...currHabits];
      });
    } catch (error) {
      console.log(error);
    }
    setModalOpen(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.container}>
          <Modal visible={modalOpen} animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <Pressable onPress={() => setModalOpen(false)}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size={24}
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                  />
                </Pressable>
                <HabitForm postHabit={postHabit} user_id={user_id} />
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Pressable onPress={() => setModalOpen(true)}>
            <FontAwesomeIcon
              icon={faPlus}
              size={24}
              style={styles.modalToggle}
            />
          </Pressable>

          {userHabits.map((habit: Habits, index: number) => (
            <HabitCard
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
    </SafeAreaView>
  );
};

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
