import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import React, { useState } from 'react'
import axios from 'axios';


const Registration = ({navigation}) => {

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const handleRegister = async (e) => {

    e.preventDefault();
    await axios.post("http://snapi.epitech.eu:8000/inscription", {
      email: email,
      password: password,
      headers:{
          "Content-Type": "application/json", 
      }
    })
    .then((res) => {
        if(res) {
          navigation.navigate("Login")
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.title}>Registration</Text>
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

      <Button title='Inscription' onPress={handleRegister}/>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    position:'absolute',
    top:70,
    left:20,
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

export default Registration