import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import LandingScreen from '../screens/LandingScreen';
import OtpScreen from '../screens/OtpScreen';
import SelectAddressScreen from '../screens/SelectAddressScreen';
// import SplashScreen from './SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Tabs from './tabs';

const RootStack = createStackNavigator();

const RootNavigator = ({navigation}) => {
  const {userDetails} = useSelector(state => state.userReducer);
  console.log(userDetails);
  console.log(userDetails);
  return (
    <RootStack.Navigator
      headerMode="None"
      initialRouteName={
        userDetails && userDetails.userId ? 'Tabs' : 'LandingScreen'
      }
      // initialRouteName='Tabs'
    >
      {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <RootStack.Screen name="LandingScreen" component={LandingScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
          },
        }}
      />
      <RootStack.Screen name="OtpScreen" component={OtpScreen} />
      <RootStack.Screen
        name="SelectAddressScreen"
        component={SelectAddressScreen}
      />
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
