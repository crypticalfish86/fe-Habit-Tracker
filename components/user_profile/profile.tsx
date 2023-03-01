import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { UserContext } from './user_context';
import axios from 'axios';

interface UserData {
  name: string,
  avatar_url: string,
  description: string,
  streakCount: number,
  achievements: [],
  images: string[],
}

export const Profile = () => {
  const { user_id } = useContext(UserContext);
  const [ user, setUserData ] = useState<UserData>({
    name: '',
    avatar_url: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp',
    description: '',
    streakCount: 0,
    achievements: [],
    images: [],
  }); 
  const [images, setImages] = useState([
    'https://cdn-icons-png.flaticon.com/512/2655/2655537.png',
    'https://cdn-icons-png.flaticon.com/512/2655/2655542.png',
    'https://cdn-icons-png.flaticon.com/512/2655/2655510.png',
    'https://cdn-icons-png.flaticon.com/512/2655/2655504.png',
    'https://cdn-icons-png.flaticon.com/512/2655/2655527.png',
    'https://cdn-icons-png.flaticon.com/512/2655/2655516.png'
  ]);
  const [habitCount, setHabitCount] = useState(Math.floor(Math.random() * 15));
  const [streakCount, setStreakCount] = useState(Math.floor(Math.random() * 100));
  const [refreshing, setRefreshing] = useState(false);
  // const [achieveCount, setAchieveCount] = useState(5);

  useEffect(() => {
    axios.get(`https://final-api.onrender.com/users/${user_id}`)
    .then(({ data }) => setUserData(data))
    .catch((error) => console.log(error));
  }, [user_id]);

  useEffect(() => {
    axios.get(`https://final-api.onrender.com/users/${user_id}/habits`)
    .then(({ data }) => setHabitCount(data.length))
    .catch((error) => console.log(error))
  })

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    axios.get(`https://final-api.onrender.com/users/${user_id}`)
    .then(({ data }) => setUserData(data))
    .catch((error) => console.log(error))
    .finally(() => setRefreshing(false))

    axios.get(`https://final-api.onrender.com/users/${user_id}/habits`)
    .then(({ data }) => setHabitCount(data.length))
    .catch((error) => console.log(error))

  }, [user_id]);


  return (
    <View style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: user.avatar_url }}
          />
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{habitCount}</Text>
              <Text style={styles.statsLabel}>Habits</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{streakCount}</Text>
              <Text style={styles.statsLabel}>Streak</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsCount}>{user.achievements.length}</Text>
              <Text style={styles.statsLabel}>Badges</Text>
            </View>
          </View>
          <View style={styles.bio}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Bio |</Text>
            <Text style={styles.infoText}>{user.description}</Text>
        </View>
        </View>
        </View>
      </View>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.body}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    marginTop: 20
  },
  headerContent: {
    alignItems: 'center'
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600'
  },
  statsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  statsBox: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  statsCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000'
  },
  statsLabel: {
    fontSize: 14,
    color: '#999999'
  },
  body: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageContainer: {
    width: '33%',
    padding: 5,
  },
  image: {
    width: '100%',
    height: 105,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
  bio: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
