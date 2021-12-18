import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../constants/theme';

const CartScreen = ({navigation}) => {
  const [cartProducts, setCartProducts] = useState([
    {
      id: 1,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 1,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 2,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 1,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 3,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 1,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 4,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 1,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
  ]);
  const [rerender, setrerender] = useState(true);

  function changeQuantity(changeType, id) {
    let data = cartProducts;
    let productIndex = data.findIndex(item => item.id === id);
    data[productIndex].quantity += changeType === 'increase' ? 1 : -1;
    setCartProducts(data);
    setrerender(!rerender);
  }

  const CartProduct = ({item, index}) => {
    return (
      <TouchableHighlight
        // onPress={() =>
        //   navigation.navigate('ProductDetails', {
        //     headerTitle: item.name,
        //   })
        // }
        style={[
          styles.cardContainer,
          {marginBottom: index === cartProducts.length - 1 ? 110 : 10},
        ]}>
        <View style={[styles.productCard]}>
          <Image source={{uri: item.images[0]}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.h3, {width: '75%'}]}>{item.name}</Text>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: COLORS.lightGray,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="minus"
                    color="black"
                    size={25}
                    onPress={() => changeQuantity('decrease', item.id)}
                  />
                </View>
                <Text style={[FONTS.body3, {marginHorizontal: 10}]}>
                  {item.quantity}
                </Text>
                <View
                  style={{
                    backgroundColor: COLORS.lightGray,
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon
                    name="plus"
                    color="black"
                    size={25}
                    onPress={() => changeQuantity('increase', item.id)}
                  />
                </View>
              </View>
            </View>
            {item.price > item.selling_price ? (
              <>
                <Text
                  style={[FONTS.body4, {textDecorationLine: 'line-through'}]}>
                  Rs. {item.price}
                </Text>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={[FONTS.body4, {}]}>
                    Rs. {item.selling_price}
                  </Text>
                  <Text style={[FONTS.body5, {marginLeft: 5}]}>
                    (
                    {Math.round(
                      ((item.price - item.selling_price) / item.price) * 100,
                    )}
                    % off)
                  </Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[FONTS.body3, {}]}>Rs. {item.selling_price}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={[{padding: 20}]}>
        <TouchableHighlight
          style={[
            {
              backgroundColor: COLORS.black,
              paddingVertical: 10,
              borderRadius: 10,
            },
          ]}>
          <Text style={[FONTS.h2, {textAlign: 'center', color: COLORS.white}]}>
            Place Order
          </Text>
        </TouchableHighlight>
        <View style={{marginTop: 20}}>
          {cartProducts.map((product, index) => (
            <CartProduct item={product} index={index} key={index} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productCards: {
    width: '100%',
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: '100%',
    width: '35%',
    resizeMode: 'cover',
  },
  productInfo: {
    width: '50%',
    padding: 20,
  },
});

export default CartScreen;
