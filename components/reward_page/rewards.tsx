import {
  StyleSheet,
  Pressable,
  View,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { RewardCard } from "./rewardcard";
import uuid from "react-uuid";
import { useRoute } from "@react-navigation/native";
import { RewardForm } from "./rewardform";
import { globalStyles } from "../../styles/styles";

// user_id hardcoded in App.tsx

interface RewardsProps {
  user_id: number;
}

interface Body {
  rewards_name : string;
  rewards_description : string;
  rewards_cost : string
  user_id : number
}

interface UserRewards {
  rewards_name: string;
  rewards_description: string;
  rewards_cost: number;
  user_id: number;
}

export const Rewards = () => {
  const route = useRoute();
  const [modalOpen, setModalOpen] = useState(false);
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

  const postReward = async (Body: Body) => {
    Body.rewards_cost = JSON.parse(Body.rewards_cost)
    Body.user_id = user_id
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Body),
    };
    console.log(requestBody)
    try {
      const response = await fetch(
        `https://final-api.onrender.com/rewards/`, requestBody
      );
      
      const data = await response.json();
      console.log(data)
      setUserRewards((currRewards) => {return [data , ...currRewards]});
    } catch (error) {
      console.log(error);
    }
    setModalOpen(false);
  };

  return (
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
            <RewardForm postReward={postReward} user_id={user_id} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Pressable onPress={() => setModalOpen(true)}>
        <FontAwesomeIcon
          icon={faPlus}
          size={24}
          style={{ ...styles.modalToggle }}
        />
      </Pressable>

      {userRewards.map((reward: UserRewards, index: number) => (
        <RewardCard
          key={uuid()}
          rewards_name={reward.rewards_name}
          rewards_description={reward.rewards_description}
          rewards_cost={reward.rewards_cost}
          user_id={reward.user_id}
        />
      ))}
    </View>
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
