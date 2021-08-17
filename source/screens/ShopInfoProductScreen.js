import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../constants/theme';
import FilterModal from './FilterModal';

const ShopInfoProductScreen = ({navigation, ...props}) => {
  navigation.setOptions({title: props.route.params.headerTitle});
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [shopInfo, setShopInfo] = useState({
    name: 'Store',
    image: [
      'https://images.unsplash.com/photo-1561710309-9a739908b336?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=612&q=80',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  });

  const data = [
    {
      id: 1,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 2,
      name: 'Handbag',
      images: [
        'https://5.imimg.com/data5/WB/SS/MY-59654262/ladies-designer-handbag-500x500.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 3,
      name: 'Handbag',
      images: [
        'https://m.media-amazon.com/images/I/7164mGGMT-L._AC_SL1500_.jpg',
      ],
      price: 280,
      selling_price: 280,
      mrp: 500,
      quantity: 50,
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
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 5,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 280,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 6,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 7,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 280,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 8,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 9,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'inactive',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 10,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
    {
      id: 11,
      name: 'Handbag',
      images: [
        'https://theleathergarden.com/media/catalog/product/cache/051e751c543d1559e85a534f442fde7f/e/d/editorialhpb-1.jpg',
      ],
      price: 280,
      selling_price: 250,
      mrp: 500,
      quantity: 50,
      status: 'active',
      tags: ['New', 'Handbag'],
      category: 'Handbag',
    },
  ];

  const [products, setProducts] = useState(data);

  const ProductCard = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('ShopProductDescription', {
            headerTitle: item.name,
          })
        }
        style={[styles.cardContainer]}>
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
            </View>
            {item.price > item.selling_price ? (
              <>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[FONTS.body4, {textDecorationLine: 'line-through'}]}>
                    Rs. {item.price}
                  </Text>
                  <Text style={[FONTS.body4, {marginLeft: 5}]}>
                    {item.selling_price}
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
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View>
          <Image
            source={{uri: shopInfo.image[0]}}
            style={{height: 400, borderRadius: 10}}
          />
        </View>
        <Text style={[FONTS.h2, {marginTop: 15}]}>{shopInfo.name}</Text>
        <Text
          style={[
            FONTS.body4,
            {
              textAlign: 'center',
              marginTop: 10,
              textAlign: 'justify',
            },
          ]}>
          {shopInfo.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[FONTS.h2, {marginTop: 15}]}>Products</Text>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={{padding: 10}}>
            <Icon name="sort-variant" color={COLORS.gray} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 100,
            }}>
            {products.map((product, index) => (
              <ProductCard item={product} index={index} key={index} />
            ))}
          </View>
        </View>
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
  productCard: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    width: '100%',
    padding: 20,
  },
});

export default ShopInfoProductScreen;
