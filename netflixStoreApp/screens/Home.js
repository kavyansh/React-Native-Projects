
import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  ScrollView
} from 'react-native';

import {List, ListItem, Left, Button, Body, Right,CheckBox, Title, Fab, View, H1, Subtitle, Container, Text, Card, CardItem, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from "@react-navigation/native";


const Home=({navigation,route}) => {

  const [listOfSeries,setListOfSeries]= useState([]);
  const [loading,setLoading]=useState(false);
  const [rednerListAfterAdd,setRenderListAfterAdd]=useState(false);
  
  const isFocused=useIsFocused();
  console.log(isFocused);


  const getList= async () =>{
    console.log("getList Called");
    setLoading(true);
    const storedValue= await AsyncStorage.getItem("@season_list");
    
    if(!storedValue){
      setListOfSeries([]);
    }

    const list=JSON.parse(storedValue);
    setListOfSeries(list);
    setLoading(false);

    // if(isFocused==1){
    //   isFocused=0;
    //   setRenderListAfterAdd(false);
    // }
  }



  const deleteSeason= async (id)=>{
    const newList= await listOfSeries.filter((list)=>list.id!==id);
    await AsyncStorage.setItem("@season_list", JSON.stringify(newList));
    setListOfSeries(newList);

  }

  const markComplete= async (id)=>{
    const newList= listOfSeries.map((list)=>{

      if(list.id==id){
        list.isWatched=!list.isWatched;
      }
      return list;
    });

    await AsyncStorage.setItem("@season_list", JSON.stringify(newList));
    setListOfSeries(newList);

  }

  useEffect(()=>{
    getList();
  },[isFocused])


  if(loading){
    return(
      <Container style={styles.container}>
        <Spinner color="#00b7c2"/>
      </Container>
    )
  }

  // if(isFocused==1){
  //   if(rednerListAfterAdd==false){
  //   getList();
  //   setRenderListAfterAdd(true);
  //   }
  //   isFocused=0;
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {listOfSeries.length== 0? (

          <Container style={styles.container}>
            <H1 style={styles.heading}>Wacthlist is empty. Please add a series</H1>
          </Container>

        ) : (
          <>
           <H1 style={styles.heading}>Next series to watch</H1>
           <List>
          {listOfSeries.map((series)=>{
            return (
          
            <ListItem key={series.id} style={styles.listItem}>
            
              <Left>
                <Button
                style={styles.actionButton}
                danger
                onPress={()=>{deleteSeason(series.id)}}
                >
                  <Icon size={30} name="trash" active></Icon>
                </Button>
                <Button
                style={styles.actionButton}
                onPress={()=>{
                  navigation.navigate("Edit", {series})
                }}
                >
                  <Icon active size={30} name="edit" type="Feather"></Icon>
                </Button>
              </Left>
              <Body>
                <Title style={styles.seasonName}>{series.seriesName}</Title>
                <Text style={styles.totalNoSeason} note> {series.totalNoSeason} seasons to watch</Text>
              </Body>
              <Right>
                <CheckBox
                checked={series.isWatched}
                onPress={()=> markComplete(series.id)}
                >
                </CheckBox>
              </Right>
              
            </ListItem>
          

            )

          })}
          </List>
          </>

        )}


        <Fab
            style={{backgroundColor: "#5067FF"}}
            position="bottomRight"
            onPress={() => navigation.navigate('Add')}
            >
            <Icon><H1>+</H1></Icon>
        </Fab> 

    
    
    </ScrollView>
  );
};


export default Home;


const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
    width: 50,
    justifyContent: "center"
  },
  seasonName: {
    color: '#FF9F4A',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});