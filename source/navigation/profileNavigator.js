import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {COLORS, FONTS} from '../constants/theme';
import {addUser} from '../redux/actions/user';
import ActiveOrderScreen from '../screens/ActiveOrderScreen';
import OrderInfo from '../screens/OrderInfo';
import PastOrderScreen from '../screens/PastOrderScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
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
                <Text style={[FONTS.body3, {color: COLORS.black}]}>Logout</Text>
                <FontAwesomeIcon
                  style={{marginHorizontal: 10}}
                  name="sign-out-alt"
                  color="black"
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
            backgroundColor: COLORS.black,
          },
          headerTitleContainerStyle: {
            left: 50,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="PastOrders"
        component={PastOrderScreen}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleContainerStyle: {
            left: 50,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="OrderInfo"
        component={OrderInfo}
        options={{
          headerTintColor: COLORS.white,
          headerStyle: {
            backgroundColor: COLORS.black,
          },
          headerTitleContainerStyle: {
            left: 50,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
