import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, SafeAreaView, StatusBar  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Photo() {
  
  const [pickedImagePath, setPickedImagePath] = useState(''); // le chemin de l'image prise
  const [user,setUser] = useState([]);
  const [Token, setToken] = useState('');


  useEffect(() => {

    getData();

  }, [])
  

  const requeteAxios = async () => {
    await axios.get("http://snapi.epitech.eu:8000/all", {
     headers: {
       "Token": Token,
     }
   })
     .then((res) => {
       if(res){
          //  console.log(res.data.data.map((u) => u.email));
           setUser(res.data.data);
          //  setUser(res.data.data.map((u) => u.email));
       }
     })
     .catch((err) => {
       console.log(err);
     })
 }

  useEffect(() => {

    if(pickedImagePath){
        requeteAxios();
        
    }else{
        console.log(null);
    }

  }, [pickedImagePath])

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
  
  const showImagePicker = async () => { // quand je clique sur "select an image" cette function s'active 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); // demande la permission d'accéder a la galerie
    if (permissionResult.granted === false) {
      alert("Accès refusé");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result) {
      setPickedImagePath(result.uri);
      
        requeteAxios;


    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Accès refusé");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      
      requeteAxios;

    }
  }


  return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
    {/* <View style={styles.screen}> */}
      {/* <View style={styles.buttonContainer}> */}
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />  
      {/* </View> */}
 
      {/* <View style={styles.imageContainer}> */}
        {pickedImagePath !== '' && <Image source={{ uri: pickedImagePath }} style={styles.image}/>}
      {/* </View> */}
      {/* <View style={styles.contactContainer}> */}

        { 
        user.map((u) => <Button onPress={ 
          
            (e) => {

            e.preventDefault();

            // let body = new FormData();
            // body.append('image', {uri: pickedImagePath, type: 'image/jpeg', name: 'image'})

            axios.post("http://snapi.epitech.eu:8000/snap", {
              duration: 5,
              to: u.email,
              image: pickedImagePath,
              headers: {
                "Content-Type": "multipart/form-data",
                "token": Token
              }
            })
              .then((res) => {
                if (res) {

                  console.log("bon projet j'aime bien");
                  
                }
              })
              .catch((err) => {
                console.log(err);
              })
          }

      } key={u.email} title={u.email}/>)
        }

      {/* </View> */}
    {/* </View> */}
      </ScrollView>
      </SafeAreaView>
  );
}

export default Photo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageContainer: {
    padding: 40
  },
  image: {
    width: 400,
    height: 200,
    // resizeMode: 'cover'
  },
  contactContainer: {
    display: 'flex',
    height: 300,
    width: '100%',
    // backgroundColor: 'green',
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 20
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  }
});