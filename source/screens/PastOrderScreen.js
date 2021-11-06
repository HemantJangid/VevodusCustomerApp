import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import globalStyles from '../constants/styles';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import Header from '../components/Header';
import appTheme, {COLORS} from '../constants/theme';
import axios from 'axios';
import requestUrls from '../constants/requestUrls';
import {useSelector} from 'react-redux';

const PastOrderScreen = ({navigation, ...props}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userDetails} = useSelector(state => state.userReducer);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', payload => {
      getOrders();
    });
  }, []);

  function getOrders() {
    setLoading(true);
    let params = {userId: userDetails.userId, historyType: 'PAST'};
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.ordersHistory}`, {
        params,
      })
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 201) {
        } else if (response.status === 200) {
          setOrders(response.data);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  function handleOrderDetails(order) {
    navigation.navigate('OrderInfo', {orderInfo: order});
  }

  function CurrentOrders() {
    return (
      <>
        <View style={styles.currentOrderSection}>
          {/* <Text style={appTheme.FONTS.h2}>Current Orders</Text> */}
          <View style={styles.orderCards}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={orders}
              style={{minHeight: 50}}
              renderItem={({item, index}) => {
                return (
                  <TouchableHighlight
                    onPress={() => handleOrderDetails(item)}
                    key={index}
                    style={styles.cardContainer}>
                    <View style={[styles.orderCard]}>
                      <Avatar.Image
                        size={72}
                        source={{uri: item.photoLink}}
                      />
                      <View style={styles.orderInfo}>
                        <Text style={appTheme.FONTS.h3}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            appTheme.FONTS.body4,
                            {color: appTheme.COLORS.gray},
                          ]}>
                          Quantity: {item.quantity}
                        </Text>
                        <Text
                          style={[
                            appTheme.FONTS.body4,
                            {color: appTheme.COLORS.gray},
                          ]}>
                          Order Value: ₹
                          {item.quantity * item.sp}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                );
              }}
              keyExtractor={(item, index) => index}
              onRefresh={() => getOrders()}
              refreshing={loading}
            />
          </View>
          {orders.length === 0 && (
            <Text
              style={[
                appTheme.FONTS.body3,
                {textAlign: 'center', marginTop: appTheme.SIZES.padding},
              ]}>
              No Orders to show here.
            </Text>
          )}
        </View>
      </>
    );
  }

  function PastOrders() {
    return (
      <View style={styles.PastOrderSection}>
        <Text style={appTheme.FONTS.h2}>Past Orders</Text>
        <View style={styles.noOrderSection}>
          <Text style={[appTheme.FONTS.body4, {color: appTheme.COLORS.gray}]}>
            Nothing to show here
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      {/* {loading ? (
        <ActivityIndicator animating={true} color={COLORS.black} size="small" />
      ) : (
        <ScrollView style={[globalStyles.screenContainer, {marginBottom: 70}]}>
          <CurrentOrders />
          <PastOrders />
        </ScrollView>
      )} */}
      <ScrollView
        style={[globalStyles.screenContainer, {marginBottom: 70}]}
        showsVerticalScrollIndicator={false}>
        <CurrentOrders />
        {/* <PastOrders /> */}
      </ScrollView>
    </>
  );
};

export default PastOrderScreen;

const styles = StyleSheet.create({
  sectionHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  currentOrderSection: {
    padding: 20,
  },
  orderCards: {
    // marginTop: 20,
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  orderInfo: {
    marginLeft: 20,
  },
  PastOrderSection: {
    paddingHorizontal: 20,
  },
  noOrderSection: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
