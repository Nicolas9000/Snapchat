import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({ navigation }) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [Token, setToken] = useState('');

  useEffect(() => {

    getData();

  }, [])

  const getData = async () => {
    try {
    const value = await AsyncStorage.getItem('Token')
      if(value !== null) {
        // value previously stored
        setToken(value);
        navigation.navigate("Acceuil");
      }else{
        navigation.navigate("Login");
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  const storeData = async (Token) => {
    try {
      await AsyncStorage.setItem('Token', Token)
      
      navigation.navigate("Acceuil")

    } catch (e) {
      // saving error
      console.log(e);
    }
  }


  const handleRegister = async (e) => {

    e.preventDefault();
    await axios.post("http://snapi.epitech.eu:8000/connection", {
      email: email,
      password: password,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (res) {
          const token = res.data.data.token;

          storeData(token)
          
          // console.log(AsyncStorage.getItem('Token'));


        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.title}>Login</Text>
      <Text style={styles.text} onPress={() => navigation.navigate("First")}> X </Text>


      <TextInput style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder='Enter your email'
      />

      <TextInput style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder='Enter your password'
      />

      <Button title="Login" onPress={handleRegister} />

    </View>
  )
}


const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: 70,
    left: 20,
    color: 'blue',
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    color: 'blue',
    backgroundColor: '#fffddc',
    width: '80%',
    height: '5%',
    marginVertical: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ffed00'
  },
  title: {
    fontSize: 50,
  }
});

export default Login