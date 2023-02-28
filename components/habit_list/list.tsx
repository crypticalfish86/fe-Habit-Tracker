import React from "react";
import { Text, View, Button, ScrollView, StyleSheet } from "react-native";
import { Footer } from "../footer/footer";

export const List = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Habit")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Habit List
      </Text>
    </View>
  );
};
