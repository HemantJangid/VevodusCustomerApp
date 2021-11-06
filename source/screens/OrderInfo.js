import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';

import globalStyles from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {COLORS, FONTS, SIZES} from './../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';

const OrderInfo = ({navigation, route, ...props}) => {
  console.log(route.params);
  navigation.setOptions({title: route.params.orderInfo.name});
  const [orderInfo, setOrderInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(true);
  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    getOrderDetails();
  }, []);

  function getOrderDetails() {
    setLoading(true);
    let params = {checkoutId: route.params.orderInfo.checkoutId};
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.orderDetails}`, {
        params,
      })
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setOrderInfo(response.data);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function handleOrder(action) {
    let data = {checkoutId: orderInfo.checkout, status: action};
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.acceptOrDeclineOrder}`, data)
      .then(response => {
        // setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setOrderInfo({
            checkoutInfo: {
              ...orderInfo.checkoutInfo,
              status: action === 'APPROVE' ? 'A' : 'D',
            },
            userInfo: {...orderInfo.userInfo},
          });
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

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
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* <Header name="Profile" /> */}
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: orderInfo && orderInfo.checkoutDetails.photoLink,
                }}
                size={80}
              />
              {orderInfo && (
                <View style={{marginLeft: 20}}>
                  <Title style={appTheme.FONTS.h2}>
                    {orderInfo && orderInfo.checkoutDetails.name}
                  </Title>
                  <Caption style={appTheme.FONTS.body3}>
                    Quantity: {orderInfo && orderInfo.checkoutDetails.quantity}
                  </Caption>
                </View>
              )}
            </View>
          </View>

          <View style={[styles.userInfoSection, {paddingTop: 20}]}>
            <Text style={[FONTS.h2]}>Order Details</Text>
            {orderInfo && (
              <View style={styles.row}>
                <Text
                  style={[
                    {color: appTheme.COLORS.black},
                    appTheme.FONTS.body3,
                  ]}>
                  MRP:
                </Text>
                <Text
                  style={[
                    {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                    appTheme.FONTS.body3,
                  ]}>
                  {orderInfo && orderInfo.checkoutDetails.mrp}
                </Text>
              </View>
            )}
            {orderInfo && (
              <View style={styles.row}>
                <Text
                  style={[
                    {color: appTheme.COLORS.black},
                    appTheme.FONTS.body3,
                  ]}>
                  Selling Price:
                </Text>
                <Text
                  style={[
                    {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                    appTheme.FONTS.body3,
                  ]}>
                  {orderInfo && orderInfo.checkoutDetails.sp}
                </Text>
              </View>
            )}
          </View>

          <View style={[styles.userInfoSection, {paddingTop: 20}]}>
            <Text style={[FONTS.h2]}>Seller Details</Text>
            {orderInfo && (
              <View style={styles.row}>
                <Text
                  style={[
                    {color: appTheme.COLORS.black},
                    appTheme.FONTS.body3,
                  ]}>
                  Name:
                </Text>
                <Text
                  style={[
                    {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                    appTheme.FONTS.body3,
                  ]}>
                  {orderInfo && orderInfo.shopInfo.name}
                </Text>
              </View>
            )}
            {orderInfo && (
              <View style={styles.row}>
                <Text
                  style={[
                    {color: appTheme.COLORS.black},
                    appTheme.FONTS.body3,
                  ]}>
                  Address:
                </Text>
                <Text
                  style={[
                    {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                    appTheme.FONTS.body3,
                  ]}>
                  {orderInfo && orderInfo.shopInfo.address}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default OrderInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItemContainer: {
    backgroundColor: 'white',
    marginBottom: 2,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
