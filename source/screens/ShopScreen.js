import React, {useState, useRef} from 'react';
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
import ProductNavigator from '../navigation/productNavigator';
import {FONTS, SIZES, COLORS} from './../constants/theme';

const ShopScreen = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Store',
      images: [
        'https://images.unsplash.com/photo-1561710309-9a739908b336?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80',
      ],
    },
  ];

  const [shops, setShops] = useState(data);

  const ShopCard = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('ShopInfoProduct', {
            headerTitle: item.name,
          })
        }
        style={[styles.cardContainer]}>
        <View style={[styles.shopCard]}>
          <Image source={{uri: item.images[0]}} style={styles.shopImage} />
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
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: 100,
        }}>
        {shops.map((shop, index) => (
          <ShopCard item={shop} index={index} key={index} />
        ))}
      </ScrollView>
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
