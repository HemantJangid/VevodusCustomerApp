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
import ProductNavigator from '../navigation/productNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import appTheme, {FONTS, SIZES, COLORS} from './../constants/theme';
import FilterModal from './FilterModal';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const ProductScreen = ({navigation, route, ...props}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [rerender, setrerender] = useState(true);
  const [loading, setLoading] = useState(true);
  const [shopId, setShopId] = useState(
    route.params && route.params.shopId ? route.params.shopId : -1,
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.addListener('focus', payload => {
      getProducts();
    });
  }, []);

  // useEffect(() => {
  //   setrerender(!rerender);
  //   setShopId(route.params && route.params.shopId ? route.params.shopId : -1);
  // }, [isFocused]);

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getProducts();
  // }, [shopId]);

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
          shopId: -1,
          verified: 1,
          isLive: 1,
        },
      })
      .then(response => {
        // console.log(response);
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setProducts(response.data.products);
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
          navigation.navigate('ProductDetails', {
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
            contentContainerStyle={{
              padding: 10,
              paddingBottom: 100,
              width: '100%',
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: shopId === -1 ? 'flex-end' : 'space-between',
                paddingHorizontal: 10
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '88%',
                  backgroundColor: COLORS.lightGray,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginLeft: 8,
                  height: 50,
                  borderRadius: 30,
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
                    console.log('search: ', searchQuery);
                  }}
                />
                {searchQuery.length !== 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery('');
                    }}
                    style={{marginRight: 10}}>
                    <Icon
                      name="cancel"
                      color={appTheme.COLORS.gray}
                      size={20}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                onPress={() => setShowFilterModal(true)}
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="filter" color={COLORS.gray} size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                // justifyContent: 'center'
                marginTop: 10,
              }}
              key='products'
              >
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
                      appTheme.FONTS.body3,
                      {textAlign: 'center', marginTop: appTheme.SIZES.padding},
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
                      appTheme.FONTS.body3,
                      {textAlign: 'center', marginTop: appTheme.SIZES.padding},
                    ]}>
                    No Products to show here.
                  </Text>
                </View>
              )}
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

export default ProductScreen;
