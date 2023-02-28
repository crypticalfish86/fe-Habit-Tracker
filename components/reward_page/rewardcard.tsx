import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

interface RewardCardProps {
  rewards_name: string;
  rewards_description: string;
  rewards_cost: number;
  user_id: number;
}

export const RewardCard = (props: RewardCardProps) => {
  const [canBuyReward, setCanBuyReward] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const { rewards_name, rewards_description, rewards_cost, user_id } = props;

  const buyReward = (event: any) => {
    setButtonPressed(true);
    event.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://final-api.onrender.com/users/${user_id}/currency`
        );
        const data = await response.json();

        if (data.currency < rewards_cost) {
          setCanBuyReward(false);
        } else if (data.currency > rewards_cost) {
          const newCurrency = data.currency - rewards_cost;
          const patchResponse = await fetch(
            `https://final-api.onrender.com/users/${user_id}/currency`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                newData: newCurrency,
              }),
            }
          );

          const patchedData = await patchResponse.json();

          setCanBuyReward(true);
          console.log(patchedData);
          console.log(newCurrency);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text>Reward: {rewards_name}</Text>
        <Text>Description: {rewards_description}</Text>
        <Text>Cost: {rewards_cost}</Text>
        <Text>{user_id}</Text>
        <Pressable
          style={styles.button}
          onPress={(event) => {
            buyReward(event);
          }}
        >
          <Text style={styles.buttontext}>Buy Reward</Text>
        </Pressable>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "black",
    marginLeft: 60,
    marginRight: 60,
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
