import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import requestUrls from '../constants/requestUrls';
import {COLORS, FONTS, SIZES} from '../constants/theme';
import FilterModal from './FilterModal';

const ShopInfoProductScreen = ({navigation, route, ...props}) => {
  navigation.setOptions({title: route.params.headerTitle});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [rerender, setrerender] = useState(true);
  const [loading, setLoading] = useState(true);
  const [shopId, setShopId] = useState(route.params && route.params.shopId);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);

  const [shopInfo, setShopInfo] = useState({});

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    filterProducts();
  }, [filters]);

  function getProducts() {
    setLoading(true);

    axios
      .get(`${requestUrls.baseUrl}${requestUrls.products}`, {
        params: {
          shopId: shopId,
          verified: 1,
          isLive: 1,
        },
      })
      .then(response => {
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setProducts(response.data.products);
          setShopInfo(response.data.shop[0]);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function filterProducts() {
    let filteredProducts = [];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < filters.length; j++) {
        if (products[i].categoryId === filters[j].value) {
          filteredProducts.push(products[i]);
        }
      }
    }
    setFilteredProducts(filteredProducts);
    setrerender(!rerender);
  }

  const ProductCard = ({item, index}) => {
    return (
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('ShopProductDescription', {
            headerTitle: item.name,
            productInfo: item,
          })
        }
        style={[styles.cardContainer]}>
        <View style={[styles.productCard]}>
          <Image source={{uri: item.photoLink}} style={styles.productImage} />
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
            {item.mrp > item.sp ? (
              <>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[FONTS.body4, {textDecorationLine: 'line-through'}]}>
                    Rs. {item.mrp}
                  </Text>
                  <Text style={[FONTS.body4, {marginLeft: 5}]}>{item.sp}</Text>
                  <Text style={[FONTS.body5, {marginLeft: 5}]}>
                    ({Math.round(((item.mrp - item.sp) / item.mrp) * 100)}% off)
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
        <>
          {showFilterModal && (
            <FilterModal
              filterProducts={filterProducts}
              filters={filters}
              setFilters={setFilters}
              isVisible={showFilterModal}
              onClose={() => setShowFilterModal(false)}
            />
          )}
          <ScrollView
            contentContainerStyle={{padding: 20}}
            showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={{uri: shopInfo.photoLink}}
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
              {shopInfo.description && shopInfo.description}
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
                <Icon name="filter" color={COLORS.gray} size={30} />
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
                {products.length !== 0 &&
                  (filters.length > 0
                    ? filteredProducts.map((product, index) => (
                        <ProductCard item={product} index={index} key={index} />
                      ))
                    : products.map((product, index) => (
                        <ProductCard item={product} index={index} key={index} />
                      )))}

                {filters.length > 0 && filteredProducts.length === 0 && (
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
                      No Products to show here.
                    </Text>
                  </View>
                )}

                {filters.length === 0 && products.length === 0 && (
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
                      No Products to show here.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
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
