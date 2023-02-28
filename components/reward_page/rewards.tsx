import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { RewardCard } from "./rewardcard";
import uuid from "react-uuid";
import { useRoute } from "@react-navigation/native";

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

  return (
    <View>
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
