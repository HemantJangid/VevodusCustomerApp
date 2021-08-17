import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartScreen from './../screens/CartScreen';

const Stack = createStackNavigator();

const CartNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Cart" headerMode="screen">
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
