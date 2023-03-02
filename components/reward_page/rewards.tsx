import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Modal,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../user_profile/user_context";
import { RewardCard } from "./rewardcard";
import uuid from "react-uuid";
import { RewardForm } from "./rewardform";
import { globalStyles } from "../../styles/styles";

interface RewardsProps {
  user_id: number; // get user_id - this time from UserContext
}

interface Body { // from post request
  rewards_name: string;
  rewards_description: string;
  rewards_cost: string;
  user_id: number;
}

export interface UserRewards { // from get request
  rewards_name: string;
  rewards_description: string;
  rewards_cost: number;
  user_id: number;
}

export const Rewards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user_id } = useContext(UserContext);
  const [userRewards, setUserRewards] = useState<UserRewards[]>([]);
  const [userCurrency, setUserCurrency] = useState<number>(0);

  useEffect(() => {
    Promise.all([
      fetch(`https://final-api.onrender.com/users/${user_id}/rewards`),
      fetch(`https://final-api.onrender.com/users/${user_id}/`),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then(([rewardsData, currencyData]) => {
        setUserRewards(rewardsData);
        setUserCurrency(currencyData.currency);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  const postReward = async (Body: Body) => {
    Body.rewards_cost = JSON.parse(Body.rewards_cost);
    Body.user_id = user_id;
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Body),
    };
    try {
      const response = await fetch(
        `https://final-api.onrender.com/rewards/`,
        requestBody
      );

      const data = await response.json();
      setUserRewards((currRewards) => {
        return [data, ...currRewards];
      });
    } catch (error) {
      console.log(error);
    }
    setModalOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F8F5'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          {userCurrency ? (
            <View style={styles.headerContent}>
              <Text style={styles.infoCurrency}>Current Currency: {userCurrency}</Text>
            </View>
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
          </View>

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
      <ScrollView contentContainerStyle={styles.body}>
          {userRewards.map((reward: UserRewards, index: number) => (
            <RewardCard
              key={uuid()}
              rewards_name={reward.rewards_name}
              rewards_description={reward.rewards_description}
              rewards_cost={reward.rewards_cost}
              user_id={reward.user_id}
              userRewards={userRewards}
              setUserRewards={setUserRewards}
              userCurrency={userCurrency}
              setUserCurrency={setUserCurrency}
            />
          ))}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F8F5',
  },
  header: {
    backgroundColor: '#E8F8F5',
    alignItems: 'flex-start',
    padding: 20,
  },
  headerContent: {
    alignItems: "flex-start",
  },
  body: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  infoCurrency: {
    fontWeight: '800',
    color: '#16A085',
  },
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
