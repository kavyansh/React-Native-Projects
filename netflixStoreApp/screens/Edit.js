
import React, {useEffect,useState} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const Edit= ({navigation,route}) => {

  const [seriesName,setSeriesName]=useState("");
  const [totalNoSeason,setTotalNoSeason]=useState("");
  const [id,setId]=useState(null);


  const update=async ()=>{
    try{

      if(!seriesName || !totalNoSeason){
        return alert("Please enter value in both fields");
      }

      let updatedSeries={
        id: id,
        seriesName:seriesName,
        totalNoSeason:totalNoSeason,
        isWatched:false
      }

      const storedValue=await AsyncStorage.getItem("@season_list");
      const prevList= await JSON.parse(storedValue);
      
      updatedList=prevList.map((series)=>{

        if(series.id==id){
          return updatedSeries;
        }
        return series;
      });

      await AsyncStorage.setItem("@season_list",JSON.stringify(updatedList));
      navigation.navigate("Home");

    }catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    const {series}= route.params;
    const {id,seriesName,totalNoSeason}=series;
    setId(id);
    setSeriesName(seriesName);
    setTotalNoSeason(totalNoSeason);
  },[])

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
          onPress={update}
          >
          <Text style={{color:"#eee"}}>Update</Text>
          </Button>
        </Form>
      </ScrollView>
  );
};


export default Edit;

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
  },
  formItem: {
    marginBottom: 20,
  },
});
