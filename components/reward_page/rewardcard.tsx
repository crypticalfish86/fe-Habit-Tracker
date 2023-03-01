import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEraser,
  faPen,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { UserRewards } from "./rewards";

interface RewardCardProps {
  rewards_name: string;
  rewards_description: string;
  rewards_cost: number;
  user_id: number;
  userRewards: UserRewards[];
  setUserRewards: React.Dispatch<React.SetStateAction<UserRewards[]>>;
}

export const RewardCard = ({
  rewards_name,
  rewards_description,
  rewards_cost,
  user_id,
  userRewards,
  setUserRewards,
}: RewardCardProps) => {
  const [canBuyReward, setCanBuyReward] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  // const { rewards_name, rewards_description, rewards_cost, user_id } = props;

  const buyReward = (event: any) => {
    setButtonPressed(true);
    event.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://final-api.onrender.com/users/${user_id}`
        );
        const data = await response.json();
        data.currency = parseInt(data.currency);

        if (data.currency < rewards_cost) {
          setCanBuyReward(false);
        } else if (data.currency > rewards_cost) {
          const newCurrency = data.currency - rewards_cost;
          data.currency = newCurrency;
          const patchResponse = await fetch(
            `https://final-api.onrender.com/users/${user_id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          setCanBuyReward(true);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  };

  const deleteReward = (event: any) => {
    event.preventDefault();

    setUserRewards((prevRewards) => {
      return prevRewards.filter((reward) => {
        return !(
          reward.rewards_name === rewards_name &&
          reward.rewards_description === rewards_description &&
          reward.user_id === user_id
        );
      });
    });

    return fetch(`https://final-api.onrender.com/rewards/`)
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .then((rewards) => {
        const matchingReward = rewards.filter((reward: any) => {
          if (
            reward.rewards_name === rewards_name &&
            reward.rewards_description === rewards_description &&
            reward.user_id === user_id
          ) {
            return reward;
          }
        });
        const rewardToDelete = matchingReward[0];
        return fetch(
          `https://final-api.onrender.com/rewards/${rewardToDelete.id}`,
          {
            method: "DELETE",
          }
        );
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setUserRewards((prevRewards) => {
            return [
              ...prevRewards,
              { rewards_name, rewards_description, rewards_cost, user_id },
            ];
          });
        }
      });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>Reward: {rewards_name}</Text>
        <Text>Description: {rewards_description}</Text>
        <Text>Cost: {rewards_cost}</Text>
        <View style={styles.buttoncontainer}>
          <Pressable
            id="buy"
            style={styles.button}
            onPress={(event) => {
              buyReward(event);
            }}
          >
            <FontAwesomeIcon icon={faCircleDollarToSlot} size={20} />
          </Pressable>
          <Pressable id="patch" style={styles.button}>
            <FontAwesomeIcon icon={faPen} size={20} />
          </Pressable>
          <Pressable
            id="delete"
            style={styles.button}
            onPress={(event) => {
              deleteReward(event);
            }}
          >
            <FontAwesomeIcon icon={faEraser} size={20} />
          </Pressable>
        </View>

        {buttonPressed && canBuyReward === true && (
          <Text>You deserved this!</Text>
        )}

        {buttonPressed && !canBuyReward === true && (
          <Text>Sorry, get to work!</Text>
        )}
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
  buttoncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  button: {
    marginHorizontal: 5,
  },
});
