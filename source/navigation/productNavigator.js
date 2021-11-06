import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import ProductInfoScreen from './../screens/ProductInfoScreen';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/user';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const ProductNavigator = ({navigation}) => {


  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={ProductScreen}
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
        name="ProductDetails"
        component={ProductInfoScreen}
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

export default ProductNavigator;
