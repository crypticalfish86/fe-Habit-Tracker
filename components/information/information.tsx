import * as React from "react";
import { View, Text } from "react-native";

export default function Information({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Information")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Information
      </Text>
    </View>
  );
}
