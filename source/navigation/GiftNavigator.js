import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {addUser} from '../redux/actions/user';
import { COLORS } from '../constants/theme';
import GiftScreen from '../screens/GiftScreen';

const Stack = createStackNavigator();

const GiftNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Gift"
        component={GiftScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerLeft : () => null,
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default GiftNavigator;
