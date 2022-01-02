import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import {COLORS, FONTS, SIZES} from './../constants/theme';

const ShopScreen = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const [rerender, setRerender] = useState(true);
  const {userDetails} = useSelector(state => state.userReducer);
  const [shopsToDisplay, setShopsToDisplay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState(userDetails.city);

  useFocusEffect(
    React.useCallback(() => {
      getShops();
      getCity();
    }, [rerender, userDetails.city, city]),
  );

  const getCity = async () => {
    try {
      const value = await AsyncStorage.getItem('city');
      setCity(value);
    } catch (e) {
      console.log(e);
    }
  };

  function getSearchShops() {
    setLoading(true);

    axios
      .get(`${requestUrls.baseUrl}${requestUrls.search}`, {
        params: {
          text: searchQuery,
          cityName: city,
        },
      })
      .then(response => {
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setShopsToDisplay(response.data.shop);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function getShops() {
    setLoading(true);
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.shops}`, {
        params: {
          verified: 1,
          cityName: city,
        },
      })
      .then(response => {
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setShops(response.data);
          setShopsToDisplay(response.data);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  const ShopCard = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          // console.log('shopId shopScreen: ', item.shopId);
          // navigation.navigate('Products', {
          //   screen: 'Products',
          //   params: {shopId: item.shopId},
          // });
          navigation.navigate('ShopInfoProduct', {
            shopId: item.shopId,
            headerTitle: item.name,
          });
        }}
        style={[styles.cardContainer]}>
        <View style={[styles.shopCard]}>
          <Image source={{uri: item.photoLink}} style={styles.shopImage} />
          <View style={styles.shopInfo}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.h3, {width: '75%'}]}>{item.name}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator animating={true} color={COLORS.black} size={40} />
        </View>
      ) : shopsToDisplay.length > 0 ? (
        <View>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              width: '95%',
              backgroundColor: COLORS.lightGray,
              alignItems: 'center',
              justifyContent: 'space-between',
              // marginLeft: 8,
              height: 50,
              borderRadius: 30,
              marginTop: 10,
            }}>
            <TextInput
              key="searchText"
              style={[
                FONTS.body3,
                {
                  height: 50,
                  width: '88%',
                  backgroundColor: 'transparent',
                  borderBottomWidth: 0,
                  paddingLeft: 20,
                },
              ]}
              placeholder="Search"
              placeholderTextColor={COLORS.gray}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              onSubmitEditing={() => {
                getSearchShops();
              }}
            />
            {searchQuery.length !== 0 && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setShopsToDisplay(shops);
                }}
                style={{marginRight: 10, rotation: 45}}>
                <Icon name="hospital" color={COLORS.gray} size={25} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}>
            {shopsToDisplay.map((shop, index) => (
              <ShopCard item={shop} index={index} key={index} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={[
              FONTS.body3,
              {textAlign: 'center', marginTop: SIZES.padding},
            ]}>
            No Shops to show here.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: '1%',
    marginVertical: 5,
  },
  shopCard: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  shopImage: {
    height: 100,
    width: '100%',
    resizeMode: 'cover',
  },
  shopInfo: {
    width: '100%',
    padding: 20,
  },
});

export default ShopScreen;
