import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './source/navigation/tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
