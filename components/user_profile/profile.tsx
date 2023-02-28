import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';


export const Profile = () => {
  const [images, setImages] = useState([
    'https://www.bootdey.com/image/280x280/FF00FF/000000',
    'https://www.bootdey.com/image/280x280/00FFFF/000000',
    'https://www.bootdey.com/image/280x280/FF7F50/000000',
    'https://www.bootdey.com/image/280x280/6495ED/000000',
    'https://www.bootdey.com/image/280x280/DC143C/000000',
    'https://www.bootdey.com/image/280x280/008B8B/000000'
  ]);
  const [habitCount, setPostCount] = useState(10);
  const [streakCount, setStreakCount] = useState(20);
  const [achieveCount, setAchieveCount] = useState(3);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp' }}
          />
          <Text style={styles.name}>Melissa Craw</Text>
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
              <Text style={styles.statsCount}>{achieveCount}</Text>
              <Text style={styles.statsLabel}>Prizes</Text>
            </View>
          </View>
          <View style={styles.bio}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Bio |</Text>
            <Text style={styles.infoText}>ad Astra per Aspera</Text>
        </View>
        </View>
        </View>
      </View>
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
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageContainer: {
    width: '33%',
    padding: 5
  },
  image: {
    width: '100%',
    height: 120
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
