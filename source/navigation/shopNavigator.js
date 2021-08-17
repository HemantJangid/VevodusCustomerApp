import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopScreen from './../screens/ShopScreen';
import ShopInfoProductScreen from './../screens/ShopInfoProductScreen';
import ShopProductDescription from './../screens/ShopProductDescription';

const Stack = createStackNavigator();

const ShopNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Shops" headerMode="screen">
      <Stack.Screen
        name="Shops"
        component={ShopScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Stack.Screen
        name="ShopInfoProduct"
        component={ShopInfoProductScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Stack.Screen
        name="ShopProductDescription"
        component={ShopProductDescription}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
