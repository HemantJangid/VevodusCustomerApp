// App.js
import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const Screen = () => {
  const [country, setCountry] = useState('Unknown');

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={country}
        onValueChange={(value, index) => setCountry(value)}
        mode="dropdown" // Android only
        style={styles.picker}>
        <Picker.Item label="Australia" value="Australia" />
        <Picker.Item label="Belgium" value="Belgium" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="Japan" value="Japan" />
      </Picker>
      <Text style={styles.text}>Your conuntry: {country}</Text>
    </View>
  );
};

export default Screen;

// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  picker: {
    marginVertical: 30,
    width: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: '#e8ebe9',
  },
});

// For more React Native tutorials
