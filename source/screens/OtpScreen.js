import axios from 'axios';
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';
import requestUrls from '../constants/requestUrls';
import { addUser } from '../redux/actions/user';
import globalStyles from './../constants/styles';
import {COLORS, FONTS, SIZES} from './../constants/theme';

const OtpScreen = ({navigation, route, ...props}) => {
  const [pins, setPins] = useState({
    pin1: '',
    pin2: '',
    pin3: '',
    pin4: '',
  });
  const [loading, setLoading] = useState(false);
  const [rerender, setrerender] = useState(true);
  const pin1ref = useRef();
  const pin2ref = useRef();
  const pin3ref = useRef();
  const pin4ref = useRef();

  const dispatch = useDispatch();

  function onChangeNumber(number, pinElement, nextElementRef) {
    let data = pins;
    data[pinElement] = number;
    setPins(data);
    setrerender(!rerender);
    if (nextElementRef) {
      nextElementRef.current.focus();
    }
  }

  function handleVerify() {
    setLoading(true);
    if (allPinsFilled()) {
      let loginData = {
        mobile: route.params.mobile,
        otp: `${pins.pin1}${pins.pin2}${pins.pin3}${pins.pin4}`,
        app: 'BUYER'
      };
      axios
        .post(`${requestUrls.baseUrl}${requestUrls.verityOTP}`, loginData)
        .then(response => {
          setLoading(false);
          console.log(response);
          if (response.status === 201) {
            Alert.alert(
              'Mobile not verified try again in sometime!',
              response.data,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
          } else if (response.status === 200) {
            let userDetails = response.data.userDetail[0];
            dispatch(addUser(userDetails));
            navigation.navigate('Tabs');
          }
        }).catch = err => {
        Alert.alert('SignIn Failed', err, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        console.log(err);
      };
    }
  }

  function allPinsFilled() {
    for (let pin in pins) {
      if (pins[pin] === '') return false;
    }
    return true;
  }

  return (
    <View
      style={[globalStyles.screenContainer, {backgroundColor: COLORS.gray}]}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: SIZES.padding,
          borderTopLeftRadius: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <Text style={FONTS.body2}>Enter the OTP sent</Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            onChangeText={number => onChangeNumber(number, 'pin1', pin2ref)}
            value={pins.pin1}
            keyboardType="numeric"
            style={[FONTS.body2, styles.pinInput]}
            maxLength={1}
            ref={pin1ref}
          />
          <TextInput
            onChangeText={number => onChangeNumber(number, 'pin2', pin3ref)}
            value={pins.pin2}
            keyboardType="numeric"
            style={[FONTS.body2, styles.pinInput]}
            maxLength={1}
            ref={pin2ref}
          />
          <TextInput
            onChangeText={number => onChangeNumber(number, 'pin3', pin4ref)}
            value={pins.pin3}
            keyboardType="numeric"
            style={[FONTS.body2, styles.pinInput]}
            maxLength={1}
            ref={pin3ref}
          />
          <TextInput
            onChangeText={number => onChangeNumber(number, 'pin4')}
            value={pins.pin4}
            keyboardType="numeric"
            style={[FONTS.body2, styles.pinInput]}
            maxLength={1}
            ref={pin4ref}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleVerify()}
          style={{
            marginTop: SIZES.padding,
            backgroundColor: allPinsFilled() ? COLORS.black : COLORS.lightGray,
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
          }}>
          {loading ? (
            <ActivityIndicator
              color={COLORS.white}
              animating={true}
              size="small"
            />
          ) : (
            <Text
              style={[
                FONTS.h2,
                {
                  color: allPinsFilled() ? COLORS.white : COLORS.gray,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                },
              ]}>
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pinInput: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.lightGray1,
    color: COLORS.black,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    textAlign: 'center',
    width: 80
  },
});

export default OtpScreen;
