import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import uuid from "react-uuid";
import AchieveCard from "./achievecard";

export interface Achievements {
  achievement_name: string;
  achievement_img_url: string;
  achievement_description: string;
  achievement_unlock: boolean;
  achievement_reward: string;
}

export default function Achievements({ navigation }: any) {
  const [allAchievements, setAllAchievements] = useState<Achievements[]>([]);

  useEffect(() => {});

  return (
    <View>
      {allAchievements.map((achievement: Achievements, index: number) => (
        <AchieveCard
          key={uuid()}
          achievement_name={achievement.achievement_name}
          achievement_img_url={achievement.achievement_img_url}
          achievement_description={achievement.achievement_description}
          achievement_unlock={achievement.achievement_unlock}
          achievement_reward={achievement.achievement_reward}
        />
      ))}
    </View>
  );
}
