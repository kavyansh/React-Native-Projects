
import React,{useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  NativeBaseProvider,
  H1
} from 'native-base';

import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';


const Add= ({navigation, route}) => {
  const [seriesName,setSeriesName]= useState("");
  const [totalNoSeason,setTotalNoSeason]= useState("");

  const addTOList = async ()=> {
    try{

      if(!seriesName || !totalNoSeason){
        return alert("Please add both fields");
        //Todo add snackbar to user
      }

      const seriesToAdd={
        id: shortid.generate(),
        seriesName:seriesName,
        totalNoSeason:totalNoSeason,
        isWatched:false
      }

      const storedValue=await AsyncStorage.getItem("@season_list");
      const prevList=await JSON.parse(storedValue);

      if(!prevList){
        const newList=[seriesToAdd];
        await AsyncStorage.setItem("@season_list",JSON.stringify(newList));
      }else{
        prevList.push(seriesToAdd);
        await AsyncStorage.setItem("@season_list",JSON.stringify(prevList));
      }

      setTotalNoSeason("");
      setSeriesName("");
      navigation.navigate("Home",{listUpdated:1});


    }catch(err){
      console.log(err)
    }

  }
  
  return (
    
      <ScrollView contentContainerStyle={styles.container}>
        <H1 style={styles.heading}>Add to watch List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
            placeholder="Series Name"
            style={{color:"#eee"}}
            value={seriesName}
            onChangeText={(name)=>{setSeriesName(name)}}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
            placeholder="Total no. of seasons"
            style={{color:"#eee"}}
            value={totalNoSeason}
            onChangeText={(seasonNumber)=>{setTotalNoSeason(seasonNumber)}}
            />
          </Item>
          <Button rounded block 
          onPress={addTOList}
          >
          <Text style={{color:"#eee"}}>Add</Text>
          </Button>
        </Form>
      </ScrollView>

    
  );
};


export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
    fontWeight: "normal"
  },
  formItem: {
    marginBottom: 20,
  },
});
