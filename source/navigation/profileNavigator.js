import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import {useDispatch} from 'react-redux';
import {addUser} from '../redux/actions/user';
import { COLORS, FONTS } from '../constants/theme';
import { Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import PastOrderScreen from '../screens/PastOrderScreen';
import ActiveOrderScreen from '../screens/ActiveOrderScreen';
import OrderInfo from '../screens/OrderInfo';

const Stack = createStackNavigator();

const ProfileNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  dispatch(addUser({}));
                  navigation.navigate('LandingScreen');
                }}>
                <Text style={[FONTS.body3, {color: COLORS.white}]}>Logout</Text>
                <FontAwesomeIcon
                  style={{marginHorizontal: 10}}
                  name="sign-out-alt"
                  color="white"
                  size={20}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name="ActiveOrders"
        component={ActiveOrderScreen}
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
        name="PastOrders"
        component={PastOrderScreen}
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
        name="OrderInfo"
        component={OrderInfo}
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

export default ProfileNavigator;
