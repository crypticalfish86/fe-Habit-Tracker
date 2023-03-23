import React, { useContext } from 'react';
import { UserContext } from '../user_profile/user_context';
import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export const HabitForm = (props: any) => {
  const { user_id } = useContext(UserContext);
  const postHabit = props.postHabit;

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          habit_name: '',
          habit_category: '',
          habit_type: '',
          habit_streak: 0,
          user_id: user_id,
        }}
        onSubmit={(values: any, actions) => {
          actions.resetForm();
          postHabit(values);
        }}
      >
        {(formikProps): any => {
          return (
            <View>
              <TextInput
                style={globalStyles.input}
                placeholder='Habit Name'
                onChangeText={formikProps.handleChange('habit_name')}
                value={formikProps.values.name}
              />
              <TextInput
                style={globalStyles.input}
                placeholder='Habit Category'
                onChangeText={formikProps.handleChange('habit_category')}
                value={formikProps.values.description}
              />
              <TextInput
                style={globalStyles.input}
                placeholder='Habit Type'
                onChangeText={formikProps.handleChange('habit_type')}
                value={formikProps.values.cost}
              />
              <Pressable
                style={styles.sendbutton}
                title='submit'
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
