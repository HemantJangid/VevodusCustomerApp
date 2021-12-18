import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/theme';
import constants from './../constants/constants';
import GiftNavigator from './GiftNavigator';
import ProductNavigator from './productNavigator';
import ProfileNavigator from './profileNavigator';
import ShopNavigator from './shopNavigator';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          borderRadius: 0,
          backgroundColor: COLORS.black,
          height: 70,
        },
      }}>
      {/* <Tab.Screen name="Home" component={Screen} /> */}
      <Tab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <FontAwesomeIcon
                name="boxes"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Products
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Shops"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Icon
                name="storefront"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Stores
              </Text>
            </View>
          ),
        }}
      />

      {/* <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/95/95177.png',
                }}
                resizeMode="contain"
                style={[
                  styles.tabBarIconImage,
                  {
                    tintColor: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Cart
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Gift"
        component={GiftNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Icon
                name="gift"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Gifts
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Icon
                name="account"
                color={
                  focused
                    ? constants.focusedTabBarIcon
                    : constants.unfocusedTabBarIcon
                }
                size={25}
              />
              <Text
                style={[
                  styles.tabBarIconText,
                  {
                    color: focused
                      ? constants.focusedTabBarIcon
                      : constants.unfocusedTabBarIcon,
                  },
                ]}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIconImage: {
    width: 25,
    height: 25,
  },
  tabBarIconText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Tabs;
