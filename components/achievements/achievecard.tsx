import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Achievements } from "./achievements";

export default function AchieveCard({
  achievement_name,
  achievement_img_url,
  achievement_description,
  achievement_unlock,
  achievement_reward,
}: Achievements) {
  return (
    <View style={styles.card}>
      <View style={styles.img_container}>
        <Image style={styles.image} source={{ uri: achievement_img_url }} />
      </View>
      <View style={styles.cardContent}>
        <Text>Name: {achievement_name}</Text>
        <Text>Description: {achievement_description}</Text>
        <Text>Reward: {achievement_reward}</Text>
      </View>
    </View>
  );
}

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
    height: 170,
  },
  cardContent: {
    marginHorizontal: 24,
    marginVertical: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 165,
    marginTop: -115,
  },
  img_container: {
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: "35%",
    height: 110,
    overflow: "hidden",
    marginTop: 10,
  },
});
