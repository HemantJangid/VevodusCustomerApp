import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
import {connect, useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import appTheme, {COLORS, FONTS} from './../constants/theme';
import FilterModal from './FilterModal';

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
  const {userDetails} = useSelector(state => state.userReducer);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [products, setProducts] = useState([]);
  const [city, setCity] = useState(userDetails.city);

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
      getCity();
    }, [rerender, userDetails.city, city]),
  );

  useEffect(() => {
    filterProducts();
  }, [filters]);

  const getCity = async () => {
    try {
      const value = await AsyncStorage.getItem('city');
      setCity(value);
    } catch (e) {
      console.log(e);
    }
  };

  function getSearchProducts() {
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
          setProductsToDisplay(response.data.products);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function getProducts() {
    setLoading(true);

    axios
      .get(`${requestUrls.baseUrl}${requestUrls.products}`, {
        params: {
          shopId: -1,
          verified: 1,
          isLive: 1,
          cityName: city,
        },
      })
      .then(response => {
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setProducts(response.data.products);
          setProductsToDisplay(response.data.products);
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
    setProductsToDisplay(filters.length > 0 ? filteredProducts : products);
    // setrerender(!rerender);
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
                paddingHorizontal: 10,
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
                    getSearchProducts();
                  }}
                />
                {searchQuery.length !== 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery('');
                      setProductsToDisplay(products);
                    }}
                    style={{marginRight: 10, rotation: 45}}>
                    <Icon
                      name="hospital"
                      color={appTheme.COLORS.gray}
                      size={25}
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
              key="products">
              {productsToDisplay.length > 0 ? (
                productsToDisplay.map((product, index) => (
                  <ProductCard item={product} index={index} key={index} />
                ))
              ) : (
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

const mapStateToProps = state => {
  return {
    userDetails: state.userReducer.userDetails,
  };
};

export default connect(mapStateToProps)(ProductScreen);
