import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../user_profile/user_context';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

  enum LoginStatus {
    Idle,
    Pending,
    Success,
    Failure,
  }

export function Login() {
  const { user, setUser, setUser_id } = useContext(UserContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ success, setSuccess ] = useState(false);
  const [ butt, setButt] = useState(false);
  const [ loginStatus, setLoginStatus ] = useState(LoginStatus.Idle);

  const handlePress = () => {
    setLoginStatus(LoginStatus.Pending);
    axios.get('https://final-api.onrender.com/users/')
    .then(({ data }) => {
      const foundUser = data.find((u: any) => u.username === username && u.password === password);
      if (foundUser) {
        setUser(foundUser.name);
        setUser_id(foundUser.id);
        setLoginStatus(LoginStatus.Success);
        setSuccess(true);
      } else {
        setTimeout(() => {
          setLoginStatus(LoginStatus.Failure)
          setUser('')
          setUser_id(0)
          setSuccess(false)
        }, 1000);   
      }
    })
    .catch((error) => console.log(error));
    setButt(true);
    setLoginStatus(LoginStatus.Pending);
  };

  const handleuChange = (text: string) => {
    setUsername(text);
  }
  
  const handlepChange = (text: string) => {
    setPassword(text);
  }

  const handlePressOut = () => {
    setLoginStatus(LoginStatus.Idle);
    setUsername('');
    setPassword('');
    setSuccess(false);
    setButt(false);
    setUser('');
    setUser_id(0);
  }

  return (
    <View style={styles.container}>
      {butt && user ? (
        <Text style={styles.title}>Welcome, {user.split(' ')[0]}!</Text>
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
      {(loginStatus === LoginStatus.Idle || loginStatus === LoginStatus.Pending || loginStatus === LoginStatus.Failure) && (
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      )}
      {loginStatus === LoginStatus.Success && (
        <TouchableOpacity style={styles.button2} onPress={handlePressOut}>
        <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
      <View>
      {loginStatus === LoginStatus.Pending && (
        <Text style={styles.lMsg}>Logging in...</Text>
      )}
      {butt && success && (
        <Text style={styles.yMsg}>Login successful!</Text>
      )}
      {butt && loginStatus === LoginStatus.Failure && (
        <Text style={styles.nMsg}>Invalid username or password</Text>
      )}
      </View>
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
  button2: {
    backgroundColor: '#E30B5C',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 5,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yMsg: {
    color: '#93C572',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  },
  nMsg: {
    color: '#E3735E',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  },
  lMsg: {
    color: '#B2BEB5',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
  }
});
