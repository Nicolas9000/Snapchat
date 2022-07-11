import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { set } from 'react-hook-form';


function Acceuil({ navigation }) {
  
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
      }else{
        navigation.navigate("Login");
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  
  async function removeData() {
    try {
      await AsyncStorage.removeItem('Token')
        navigation.navigate("First")
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Acceuil</Text>
      <Text  onPress={() => navigation.navigate("Photo")}>Photo</Text>
      <Button title="Logout" onPress={removeData}/>
      <Text>{Token}</Text>

    </View>
  )
}

export default Acceuil

