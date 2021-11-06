import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShopScreen from './../screens/ShopScreen';
import ShopInfoProductScreen from './../screens/ShopInfoProductScreen';
import ShopProductDescription from './../screens/ShopProductDescription';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const ShopNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Shops" headerMode="screen">
      <Stack.Screen
        name="Shops"
        component={ShopScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name="ShopInfoProduct"
        component={ShopInfoProductScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleContainerStyle: {
            left: 50
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
        }}
      />
      <Stack.Screen
        name="ShopProductDescription"
        component={ShopProductDescription}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleContainerStyle: {
            left: 50
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
