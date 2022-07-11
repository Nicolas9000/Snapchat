import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login/Login';
import Registration from './src/screens/Registration/Registration';
import Acceuil from './src/screens/Acceuil/Acceuil';
import Photo from './src/screens/Photo/Photo';


function First({ navigation }) {


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
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }


  return (
    <View style={styles.container}>


      <Text style={styles.title}>Snapchat</Text>

      <Image
        resizeMode={'contain'}
        style={{ width: 250, height: 250, }}
        source={require('./pngegg.png')}
      />

      <View style={styles.contain}>
        <View style={styles.connection}>
          <Text style={styles.text} onPress={() => navigation.navigate("Login")}>Connection</Text>
        </View>

        <View style={styles.inscription}>
          <Text style={styles.text} onPress={() => navigation.navigate("Registration")}>Inscription</Text>
        </View>

      </View>
    </View>
  );
}

function App() {


  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Acceuil" component={Acceuil} />
        <Stack.Screen name="Photo" component={Photo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 30,
    height: '100%',
    width: '100%',
    color: 'white',
    textAlign:'center',
    marginTop:'18%',
  },
  contain: {
    width: '100%',
    height: '30%',
  },
  title: {
    marginTop: '20%',
    fontSize: 40,
    fontWeight: 'bold',
    color: "white",
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  connection: {
    width: '100%',
    height: '50%',
    backgroundColor: '#000080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inscription: {
    width: '100%',
    height: '50%',
    backgroundColor: '#7F00FF',
    alignItems: 'center',
    justifyContent: 'center',
  }
});





