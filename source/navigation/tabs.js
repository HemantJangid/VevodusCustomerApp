import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ProductScreen from '../screens/ProductScreen';
import constants from './../constants/constants';
import ShopScreen from './../screens/ShopScreen';
import CartScreen from './../screens/CartScreen';
import ProductNavigator from './productNavigator';
import ShopNavigator from './shopNavigator';
import CartNavigator from './cartNavigator';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          borderRadius: 10,
          backgroundColor: '#ffffff',
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarIconView}>
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/128/1768/1768327.png',
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
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/128/2639/2639570.png',
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
                Stores
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
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
