import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../user_profile/user_context';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export function Login() {
  const { user, setUser, user_id, setUser_id } = useContext(UserContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ butt, setButt] = useState(false);

  const handlePress = () => {
    axios.get('https://final-api.onrender.com/users/')
    .then(({ data }) => {
      const foundUser = data.find((u: any) => u.username === username && u.password === password);
      if (foundUser) {
        setUser(foundUser.name);
        setUser_id(foundUser.id);
        setSuccess(true);
      } else {
        setUser('');
        setUser_id(0);
        setSuccess(false);
      }
    })
    .catch((error) => console.log(error));
    setButt(true);
  };

  const handleuChange = (text: string) => {
    setUsername(text);
  }
  
  const handlepChange = (text: string) => {
    setPassword(text);
  }

  return (
    <View style={styles.container}>
      {butt && user ? (
        <Text style={styles.title}>Welcome {user}!</Text>
      ) : (
        <Text style={styles.title}>Welcome</Text>
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleuChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlepChange}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {butt && success && (
        <Text style={styles.yMsg}>Login successful! user_id:{user_id}</Text>
      )}
      {butt && !success && user === '' && (
        <Text style={styles.nMsg}>Invalid username or password</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yMsg: {
    color: '#93C572',
    fontSize: 15,
    fontWeight: 'bold',
  },
  nMsg: {
    color: '#E3735E',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
