import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useDispatch} from 'react-redux';
import {COLORS} from '../constants/theme';
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
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default GiftNavigator;
