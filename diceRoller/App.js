import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Dice1 from './assets/dice1.png';
import Dice2 from './assets/dice2.png';
import Dice3 from './assets/dice3.png';
import Dice4 from './assets/dice4.png';
import Dice5 from './assets/dice5.png';
import Dice6 from './assets/dice6.png';

const App = () => {
  const [uri1, setUri1] = useState(Dice1);
  const [uri2, setUri2] = useState(Dice3);

  const playButtonTapped = setUri => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber) {
      case 1:
        setUri(Dice1);
        break;
      case 2:
        setUri(Dice2);
        break;
      case 3:
        setUri(Dice3);
        break;
      case 4:
        setUri(Dice4);
        break;
      case 5:
        setUri(Dice5);
        break;
      case 6:
        setUri(Dice6);
        break;

      default:
        setUri(Dice5);
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            playButtonTapped(setUri1);
          }}>
          <Image style={styles.image} source={uri1} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            playButtonTapped(setUri2);
          }}>
          <Image style={styles.image} source={uri2} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
  gamePlayButton: {
    fontSize: 20,
    marginTop: 30,
    color: '#F2A365',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderColor: '#30475E',
    borderWidth: 3,
    borderRadius: 5,
    fontWeight: 'bold',
  },
});
