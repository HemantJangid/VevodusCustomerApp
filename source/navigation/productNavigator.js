import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import {COLORS, FONTS} from '../constants/theme';
import {addUser} from '../redux/actions/user';
import ProductInfoScreen from './../screens/ProductInfoScreen';
import ProductScreen from './../screens/ProductScreen';

const Stack = createStackNavigator();

const ProductNavigator = ({navigation}) => {
  const {userDetails} = useSelector(state => state.userReducer);
  const {rerender, setRerender} = useState(true);
  const dispatch = useDispatch();
  const [city, setCity] = useState(userDetails.city);
  const [cities, setCities] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

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

  const renderCity = city => {
    return (
      <Text
        style={[
          FONTS.body3,
          {
            paddingVertical: 10,
            paddingLeft: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#696969',
          },
        ]}>
        {city.name}
      </Text>
    );
  };

  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name={`Hi ${userDetails.name && userDetails.name.split(' ')[0]}!`}
        component={ProductScreen}
        options={{
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {
            fontFamily: 'Montserrat-Medium',
            color: COLORS.black,
            textTransform: 'capitalize',
          },
          headerTitleAlign: 'left',
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
                  style={[styles.picker]}>
                  {cities.map((city, index) => {
                    return (
                      <Picker.Item
                        fontFamily="Montserrat-Regular"
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
        name="ProductDetails"
        component={ProductInfoScreen}
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

export default ProductNavigator;

const styles = StyleSheet.create({
  picker: {
    marginRight: -60,
    width: 150,
    // padding: 10,
    // backgroundColor: '#e8ebe9',
  },
});
