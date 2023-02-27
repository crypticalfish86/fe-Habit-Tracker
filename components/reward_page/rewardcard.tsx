import React from "react";
import { Button, View, Text } from "react-native";
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
    <View>
      <Text>Reward:{rewards_name}</Text>
      <Text>Description:{rewards_description}</Text>
      <Text>Cost:{rewards_cost}</Text>
      <Text>{user_id}</Text>
      <Button
        title="reward-buy"
        onPress={(event) => {
          buyReward(event);
        }}
      />
      {buttonPressed && canBuyReward === true && (
        <Text>You deserved this!</Text>
      )}

      {buttonPressed && !canBuyReward === true && (
        <Text>Sorry, get to work!</Text>
      )}
    </View>
  );
};
