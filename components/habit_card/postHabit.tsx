// import axios from "axios";
// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Pressable,
//   TextInput,
//   Button,
// } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
// import { useRoute } from "@react-navigation/native";

// interface PostData {
//   habit_name: string;
//   habit_category: string;
//   habit_type: string;
//   habit_streak: number;
//   user_id: number;
// }
// interface HabitProps {
//   user_id: number;
//   userHabits: any;
//   setUserHabits: any;
// }

// export const PostHabit = () => {
//   const route = useRoute();
//   const { user_id, userHabits, setUserHabits } = route.params as HabitProps;
//   const habitCategory = ["Exercise", "Food", "Sleep"];
//   const habitType = ["Daily", "Weekly", "Monthly"];
//   // const habitUserId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [type, setType] = useState("");
//   const [streak, setStreak] = useState(0);
//   // const [userID, setUserID] = useState(user_id)

//   const handlePost = () => {
//     console.log(user_id);
//     const postRequest = async (): Promise<void> => {
//       try {
//         const response = await axios.post(
//           `https://final-api.onrender.com/habits/`,
//           {
//             habit_name: name,
//             habit_category: category,
//             habit_type: type,
//             habit_streak: streak,
//             user_id: user_id,
//           }
//         );
//         console.log(response.status);
//         console.log(response.data);
//         setUserHabits((currHabits: any) => {
//           return [response.data, ...currHabits];
//         });
//       } catch (error) {
//         console.error("this is the post error", error);
//       }
//     };
//     postRequest();
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="habit name"
//         style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
//         onChangeText={(text) => setName(text)}
//       />
//       <SelectDropdown
//         data={habitType}
//         buttonStyle={styles.title}
//         defaultButtonText="Type"
//         onSelect={(selectedItem, index) => {
//           setType(selectedItem);
//         }}
//       />
//       <SelectDropdown
//         data={habitCategory}
//         buttonStyle={styles.title}
//         defaultButtonText="Category"
//         onSelect={(selectedItem, index) => {
//           setCategory(selectedItem);
//         }}
//       />
//       {/* <SelectDropdown
//       data={habitUserId}
//       buttonStyle={styles.title}
//       defaultButtonText='UserID'
//       onSelect={(selectedItem, index) => {
//         setUserID(selectedItem)
//       }}
//       /> */}
//       <Button
//         title="Add"
//         onPress={() => {
//           handlePost();
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     textAlign: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 8,
//     marginHorizontal: 100,
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     elevation: 3,
//   },
// });

// export default PostHabit;
