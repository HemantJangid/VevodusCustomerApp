import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductScreen from './../screens/ProductScreen';
import ProductInfoScreen from './../screens/ProductInfoScreen';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/user';
import { COLORS } from '../constants/theme';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const ProductNavigator = ({navigation}) => {

  const {userDetails} = useSelector(state => state.userReducer);  
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name={`Hola ${userDetails.name}!`}
        component={ProductScreen}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black
          },
          headerTitleAlign: 'left'
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
