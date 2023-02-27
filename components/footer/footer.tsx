import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View, StyleSheet, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";

export const Footer = ({ navigation }: any) => {
  return (
    <View>
      <FontAwesomeIcon icon={faQuestion} />
      <FontAwesomeIcon icon={faUser} />
      <FontAwesomeIcon icon={faList} />
      <FontAwesomeIcon icon={faGift} />
      <Button title="Profile" onPress={() => navigation.navigate("profile")} />
      <Button title="List" onPress={() => navigation.navigate("list")} />
      <Button title="Rewards" onPress={() => navigation.navigate("rewards")} />
      <Button
        title="Information"
        onPress={() => navigation.navigate("information")}
      />
    </View>
  );
};
