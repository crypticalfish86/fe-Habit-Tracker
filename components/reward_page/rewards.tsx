import { StyleSheet, Text, View, Button, TextInput, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { RewardCard } from "./rewardcard";
import uuid from "react-uuid";
import { useRoute } from "@react-navigation/native";
import { RewardForm } from "./Post_Form";

// user_id hardcoded in App.tsx

interface RewardsProps {
  user_id: number;
}

interface UserRewards {
  rewards_name: string;
  rewards_description: string;
  rewards_cost: number;
  user_id: number;
}

export const Rewards = () => {
  const route = useRoute();
  const [modalOpen, setModalOpen] = useState(false)
  const { user_id } = route.params as RewardsProps;
  const [userRewards, setUserRewards] = useState<UserRewards[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://final-api.onrender.com/users/${user_id}/rewards`
        );
        const data = await response.json();
        setUserRewards(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id]);


  const postReward = async (event : any, Body : Object) =>{
    event.PreventDefault()
    const requestBody = 
    {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(Body)
    }
    try {
      const response = await fetch(
        `https://final-api.onrender.com/users/${user_id}/rewards`
      );
      const data = await response.json();
      setUserRewards(data);
    } catch (error) {
      console.log(error);
    }
    setModalOpen(false)
  };


  return (
    <View>
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            {/* <FontAwesomeIcon 
              icon={faPlus}
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            /> */}
            <Button onPress={() => setModalOpen(false)}/>
            <RewardForm postReward={postReward} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {userRewards.map((reward: UserRewards, index: number) => (
        <RewardCard
          key={uuid()}
          rewards_name={reward.rewards_name}
          rewards_description={reward.rewards_description}
          rewards_cost={reward.rewards_cost}
          user_id={reward.user_id}
        />
      ))}
      < RewardForm />
    </View>
  );
};

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});