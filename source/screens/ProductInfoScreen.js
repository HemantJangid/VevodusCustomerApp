import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Image,
  Touchable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import {baseContainer} from '../constants/theme';
import {FONTS} from '../constants/theme';
import {COLORS} from './../constants/theme';
import constants from './../constants/constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import requestUrls from '../constants/requestUrls';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modalbox';
import { ActivityIndicator } from 'react-native-paper';

const ProductInfoScreen = ({navigation, route, ...props}) => {
  navigation.setOptions({title: route.params.headerTitle});
  const [productInfo, setProductInfo] = useState(route.params.productInfo);
  const [rerender, setRerender] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const modal = useRef();

  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    getAllPhotos();
  }, []);

  function getAllPhotos() {
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.productImages}`, {
        params: {
          productId: productInfo.productId,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setProductImages(response.data);
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function placeOrder() {
    let body = {
      userId: userDetails.userId,
      productId: productInfo.productId,
      quantity: quantity
    };
    setLoading(true);
    console.log('body: ', body);
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.placeOrder}`, body)
      .then(response => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          Alert.alert(
            'Order Placed',
            'Your order has been placed successfully.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          navigation.goBack();
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function changeQuantity(changeType) {
    let temp = quantity;
    temp += changeType === 'increase' ? 1 : -1;
    if (temp == 0) return;
    setQuantity(temp);
    setRerender(!rerender);
  }

  return (
    <>
      {/* <Header name={productInfo.name} /> */}
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {/* <View style={styles.productSection}></View> */}
        <View style={styles.ImageSwiperContainer}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            {productImages.map((image, index) => {
              return (
                <View style={styles.productImageWrapper} key={index}>
                  <Image
                    source={{uri: image.photoAddress}}
                    style={styles.productImage}
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.HeaderContainer}>
            <View>
              <Text style={styles.productName}>{productInfo.name}</Text>
              {productInfo.mrp > productInfo.sp ? (
                <>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        FONTS.body2,
                        {textDecorationLine: 'line-through'},
                      ]}>
                      Rs. {productInfo.mrp}
                    </Text>
                    <Text style={[FONTS.body2, {marginLeft: 5}]}>
                      {productInfo.sp}
                    </Text>
                    <Text style={[FONTS.body3, {marginLeft: 5}]}>
                      (
                      {Math.round(
                        ((productInfo.mrp - productInfo.sp) / productInfo.mrp) *
                          100,
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
                  <Text style={[FONTS.body2, {}]}>Rs. {productInfo.sp}</Text>
                </View>
              )}
            </View>
            <View></View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.productDescription}>
              {productInfo.productSpecification}
            </Text>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => {
            // Alert.alert('Place Order', 'Are you sure?', [
            //   {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            //   },
            //   {text: 'Yes', onPress: () => placeOrder()},
            // ]);
            setIsModalOpen(true);
          }}
          style={[
            {
              marginHorizontal: 20,
              marginTop: 20,
              backgroundColor: COLORS.black,
              paddingVertical: 10,
              borderRadius: 10,
            },
          ]}>
          <Text style={[FONTS.h2, {textAlign: 'center', color: COLORS.white}]}>
            Place Order
          </Text>
        </TouchableHighlight>
      </ScrollView>
      <Modal
        style={[styles.modal]}
        position={'bottom'}
        ref={modal}
        isOpen={isModalOpen}
        onClosed={() => setIsModalOpen(false)}
        coverScreen={true}>
        <View style={[styles.productCard]}>
          <Image
            source={{uri: productInfo.photoLink}}
            style={styles.modalProductImage}
          />
          <View style={styles.productInfo}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.h3, {width: '75%'}]}>{productInfo.name}</Text>
            </View>
            <View
              style={{
                marginVertical: 10,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>Quantity:</Text>
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
                    onPress={() =>
                      changeQuantity('decrease', productInfo.productId)
                    }
                  />
                </View>
                <Text style={[FONTS.body3, {marginHorizontal: 10}]}>
                  {quantity}
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
                    onPress={() => changeQuantity('increase')}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>Price:</Text>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>
                ₹{productInfo.sp}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>Total:</Text>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>
                ₹{productInfo.sp * quantity}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>Category:</Text>
              <Text style={[FONTS.body4, {color: COLORS.gray}]}>
                {productInfo.categoryName}
              </Text>
            </View>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => {
            placeOrder();
          }}
          style={[
            {
              marginTop: 30,
              backgroundColor: COLORS.black,
              paddingVertical: 12,
              borderRadius: 10,
              paddingHorizontal: 30,
            },
          ]}>
          {loading ? (
            <ActivityIndicator
              color={COLORS.white}
              animating={true}
              size="small"
            />
          ) : (
            <Text
              style={[FONTS.h2, {textAlign: 'center', color: COLORS.white}]}>
              Confirm
            </Text>
          )}
        </TouchableHighlight>
      </Modal>
    </>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  ImageSwiperContainer: {
    width: '95%',
    height: 400,
    marginHorizontal: '2.5%',
    marginTop: 15,
    borderRadius: 10,
  },
  wrapper: {},
  productImageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: 'grey',
    marginTop: 5,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  productDescription: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  modalProductImage: {
    height: '100%',
    width: '35%',
    resizeMode: 'cover',
  },
  productInfo: {
    width: '65%',
    paddingLeft: 20,
  },
});
