import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import ProductInfoScreen from './../screens/ProductInfoScreen';

const Stack = createStackNavigator();

const ProductNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductInfoScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductNavigator;
