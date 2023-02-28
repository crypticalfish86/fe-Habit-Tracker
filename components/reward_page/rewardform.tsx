import React from "react";
import { View, Pressable, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import { globalStyles } from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const RewardForm = (props: any) => {
  const postReward = props.postReward;

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: "", description: "", cost: "" }}
        onSubmit={(values: any, actions) => {
          actions.resetForm();
          postReward(values);
        }}
      >
        {(formikProps): any => {
          return (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder="Reward name"
                onChangeText={formikProps.handleChange("name")}
                value={formikProps.values.name}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Reward description"
                onChangeText={formikProps.handleChange("description")}
                value={formikProps.values.description}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Reward cost"
                onChangeText={formikProps.handleChange("cost")}
                value={formikProps.values.cost}
                keyboardType="numeric"
              />
              <Pressable
                style={styles.sendbutton}
                title="submit"
                onPress={formikProps.handleSubmit}
              >
                <FontAwesomeIcon icon={faPaperPlane} size={25} />
              </Pressable>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  sendbutton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
