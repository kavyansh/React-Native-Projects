import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

const currencyPerRupee = {
  DOLLAR: 0.014,
  EURO: 0.012,
  POUND: 0.011,
  RUBEL: 0.93,
  AUSDOLLAR: 0.2,
  CANDOLLAR: 0.019,
  YEN: 1.54,
  DINAR: 0.0043,
  BITCOIN: 0.0000004,
};

const App = () => {
  const [inputValue, setInputValue] = useState(0);
  const [result, setResultValue] = useState(0);

  const buttonPressed = currency => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please enter a value',
        backgroundColor: 'EA7773',
        textColor: '#FFFFFF',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    let res = parseFloat(inputValue) * currencyPerRupee[currency];
    setResultValue(res.toFixed(2));
  };

  return (
    <>
      <ScrollView backgroundColor="#1b262c" keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.container}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultValue}>{result}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter Value"
              placeholderTextColor="#c1c1c1"
              value={inputValue}
              onChangeText={inputValue => {
                setInputValue(inputValue);
              }}
            />
          </View>
          <View style={styles.convertButtonContainer}>
            {Object.keys(currencyPerRupee).map(currency => (
              <TouchableOpacity
                key={currency}
                style={styles.converterButton}
                onPress={() => {
                  buttonPressed(currency);
                }}>
                <Text style={styles.convertButtonText}>{currency}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },
  resultContainer: {
    height: 70,
    marginTop: 80,
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  inputContainer: {
    height: 70,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },

  resultValue: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FFF',
  },
  convertButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  converterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '33.3%',
    borderWidth: 2,
    borderColor: '#bbe1fa',
    marginTop: 10,
    backgroundColor: '#0f4c75',
  },
  convertButtonText: {
    color: '#FFF',
    fontSize: 15,
  },
});
