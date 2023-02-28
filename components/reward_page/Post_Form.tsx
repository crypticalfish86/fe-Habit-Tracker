import React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { Formik } from "formik";

export const RewardForm = () =>
{
    return(
        <View>
        <Formik
        initialValues={{name: '', description: '', cost: ''}}
        onSubmit={(values : any) => {
          
        }}
        >
          {(formikProps) : any =>
          {
            <View>
              <TextInput onChangeText={formikProps.handleChange('name')} value={formikProps.values.name}/>
              <TextInput onChangeText={formikProps.handleChange('description')} value={formikProps.values.description}/>
              <TextInput onChangeText={formikProps.handleChange('cost')} value={formikProps.values.cost}/>
              <Button title='submit' onPress={formikProps.handleSubmit}/>
            </View>
          }}
        </Formik>
      </View>
    )
}