import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import requestUrls from '../constants/requestUrls';
import ProductNavigator from '../navigation/productNavigator';
import {FONTS, SIZES, COLORS} from './../constants/theme';

const ShopScreen = ({navigation}) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', payload => {
      getShops();
    });
  }, []);

  useEffect(() => {
    getShops();
  }, []);

  function getShops() {
    setLoading(true);
    axios.get(`${requestUrls.baseUrl}${requestUrls.shops}`, {
      params: {
        verified: 1
      }
    }).then(response => {
      setLoading(false);
      if (response.status === 201) {
      } else if (response.status === 200) {
        setShops(response.data);
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
          navigation.navigate('ShopInfoProduct', {shopId: item.shopId, headerTitle: item.name});
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
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          >
          {shops.map((shop, index) => (
            <ShopCard item={shop} index={index} key={index} />
          ))}
        </ScrollView>
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
