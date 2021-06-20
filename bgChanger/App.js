import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const App = () => {
  const [randomColor, setRandomColor] = useState('rgb(32,0,126)');

  const changeBackground = () => {
    let color =
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';

    setRandomColor(color);
  };

  let resetBackground = () => {
    setRandomColor('#000000');
  };

  return (
    <>
      <StatusBar backgroundColor={randomColor} />
      <View style={[styles.container, {backgroundColor: randomColor}]}>
        <TouchableOpacity onPress={changeBackground}>
          <Text style={styles.text}>Click on</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10}}
          onPress={resetBackground}>
          <Text style={[styles.text]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(32,0,126)',
  },
  text: {
    fontSize: 30,
    backgroundColor: '#BB2CD9',
    paddingVertical: 10,
    paddingHorizontal: 40,
    color: '#FFFFFF',
    borderRadius: 15,
    textTransform: 'uppercase',
  },
});
