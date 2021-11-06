import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './source/navigation/tabs';
import RootNavigator from './source/navigation/rootNavigator';

import {Provider} from 'react-redux';
import {store, persistor} from './source/redux/store/index';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <Tabs /> */}
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
