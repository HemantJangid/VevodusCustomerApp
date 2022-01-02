import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import {COLORS} from '../constants/theme';
import {addUser} from '../redux/actions/user';
import ShopInfoProductScreen from './../screens/ShopInfoProductScreen';
import ShopProductDescription from './../screens/ShopProductDescription';
import ShopScreen from './../screens/ShopScreen';

const Stack = createStackNavigator();

const ShopNavigator = ({navigation}) => {
  const [rerender, setRerender] = useState(true);
  const {userDetails} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [city, setCity] = useState(userDetails.city);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAllCities();
    getCity();
  }, [userDetails.city, city]);

  const getCity = async () => {
    try {
      const value = await AsyncStorage.getItem('city');
      setCity(value);
    } catch (e) {
      console.log(e);
    }
  };

  function getAllCities() {
    axios.get(`${requestUrls.baseUrl}${requestUrls.cities}`).then(response => {
      if (response.status === 201) {
      } else if (response.status === 200) {
        setCities(response.data);
      }
    }).catch = err => {
      console.log(err);
    };
  }

  return (
    <Stack.Navigator initialRouteName="Shops" headerMode="screen">
      <Stack.Screen
        name="Shops"
        component={ShopScreen}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
          },
          headerLeft: () => null,
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  style={{marginRight: -8}}
                  name="map-marker-alt"
                  color="black"
                  size={15}
                />
                <Picker
                  selectedValue={city}
                  onValueChange={async (value, index) => {
                    setCity(value);
                    dispatch(addUser({...userDetails, city: value}));
                    try {
                      await AsyncStorage.setItem('city', value);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  mode="dropdown" // Android only
                  style={[styles.picker]}
                  itemStyle={{
                    backgroundColor: 'grey',
                    color: 'blue',
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 17,
                  }}>
                  {cities.map((city, index) => {
                    return (
                      <Picker.Item
                        label={
                          city.name.charAt(0).toUpperCase() +
                          city.name.slice(1).toLowerCase()
                        }
                        value={city.name}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="ShopInfoProduct"
        component={ShopInfoProductScreen}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleContainerStyle: {
            left: 50,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
          },
        }}
      />
      <Stack.Screen
        name="ShopProductDescription"
        component={ShopProductDescription}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleContainerStyle: {
            left: 50,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;

const styles = StyleSheet.create({
  picker: {
    marginVertical: 30,
    marginRight: -60,
    width: 150,
    padding: 10,
    // backgroundColor: '#e8ebe9',
  },
});
