import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import globalStyles from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import appTheme, {COLORS} from './../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {NavigationContainer} from '@react-navigation/native';

const ProfileScreen = ({navigation, route, ...props}) => {
  const [rerender, setRerender] = useState(false);
  const {userDetails} = useSelector(state => state.userReducer);
  console.log('userDetails: ', userDetails);
  useEffect(() => {
    navigation.addListener('focus', payload => {
      setRerender(!rerender);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Header name="Profile" /> */}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: userDetails.photoLink
                ? userDetails.photoLink
                : 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          {userDetails.name && userDetails.emailAddress && (
            <View style={{marginLeft: 20}}>
              <Title style={appTheme.FONTS.h2}>{userDetails.name}</Title>
              <Caption style={appTheme.FONTS.body3}>
                {userDetails.emailAddress}
              </Caption>
            </View>
          )}
        </View>
      </View>

      <View style={[styles.userInfoSection, {paddingTop: 20}]}>
        {userDetails.address && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Address:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.address}
            </Text>
          </View>
        )}
        {userDetails.mobile && (
          <View style={styles.row}>
            <Text
              style={[{color: appTheme.COLORS.black}, appTheme.FONTS.body3]}>
              Mobile:
            </Text>
            <Text
              style={[
                {color: appTheme.COLORS.gray, marginLeft: 20, width: '75%'},
                appTheme.FONTS.body3,
              ]}>
              {userDetails.mobile}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          style={styles.menuItemContainer}
          onPress={() => {
            navigation.navigate('ActiveOrders');
          }}>
          <View style={styles.menuItem}>
            <FontAwesomeIcon name="box" color={COLORS.black} size={25} />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: COLORS.black},
              ]}>
              Active Orders
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          style={styles.menuItemContainer}
          onPress={() => {
            navigation.navigate('PastOrders');
          }}>
          <View style={styles.menuItem}>
            <FontAwesomeIcon name="box" color={COLORS.black} size={25} />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: COLORS.black},
              ]}>
              Past Orders
            </Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple style={styles.menuItemContainer} onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="account-check-outline"
              color={appTheme.COLORS.primary}
              size={25}
            />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: appTheme.COLORS.primary},
              ]}>
              Support
            </Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple style={styles.menuItemContainer} onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon
              name="cog-outline"
              color={appTheme.COLORS.primary}
              size={25}
            />
            <Text
              style={[
                appTheme.FONTS.body4,
                {marginLeft: 10, color: appTheme.COLORS.primary},
              ]}>
              Settings
            </Text>
          </View>
        </TouchableRipple> */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
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
