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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONTS, SIZES, COLORS} from './../constants/theme';
import FilterModal from './FilterModal';

const ProductScreen = ({navigation}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

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
          navigation.navigate('ProductDetails', {
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
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 100,
        }}>
        <TouchableOpacity
          onPress={() => setShowFilterModal(true)}
          style={{padding: 10}}>
          <Icon name="sort-variant" color={COLORS.gray} size={30} />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {products.map((product, index) => (
            <ProductCard item={product} index={index} key={index} />
          ))}
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

export default ProductScreen;
