import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import globalStyles from './../constants/styles';
import {COLORS, FONTS, SIZES} from './../constants/theme';
import requestUrls from '../constants/requestUrls';
import {axiosAll} from '../utility/axiosAll';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../redux/actions/user';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';

const SignInScreen = ({navigation}) => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  function onChangeNumber(number) {
    setNumber(number);
  }

  function onChangePassword(password) {
    setPassword(password);
  }

  function login() {
    setLoading(true);
    let loginDetails = {
      mobile: number,
      password: password,
      app: 'BUYER',
    };
    // axiosAll('post', `${requestUrls.login}`, loginDetails)
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.sendOTP}`, {
        params: {
          mobile: number,
        },
      })
      .then(response => {
        setLoading(false);
        // navigation.navigate('OtpScreen', {
        //   mobile: number
        // });
        if (response.status === 201) {
          Alert.alert('Send OTP failed!', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          console.log(response);
          setLoading(false);
          // let user = response.data[0];
          // let userDetails = {...user};
          // dispatch(addUser(userDetails));
          navigation.navigate('OtpScreen', {
            mobile: number,
          });
        }
      }).catch = err => {
      Alert.alert('SignIn Failed', err, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      console.log(err);
    };
  }

  function handleSubmit() {
    if (number.length > 0) {
      login();
    }
  }

  return (
    <View
      style={[
        globalStyles.screenContainer,
        {
          backgroundColor: COLORS.gray,
        },
      ]}>
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
        <Text style={FONTS.body2}>Enter your mobile number to continue</Text>
        <TextInput
          onChangeText={number => onChangeNumber(number)}
          value={number}
          keyboardType="numeric"
          placeholder="Mobile number"
          placeholderTextColor={COLORS.gray}
          style={[
            FONTS.body2,
            {
              marginTop: SIZES.padding,
              backgroundColor: COLORS.lightGray1,
              color: COLORS.black,
              borderRadius: SIZES.radius,
              padding: SIZES.padding,
            },
          ]}
        />
        {/* <TextInput
          onChangeText={password => onChangePassword(password)}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={COLORS.gray}
          style={[
            FONTS.body2,
            {
              marginTop: SIZES.padding,
              backgroundColor: COLORS.lightGray1,
              color: COLORS.black,
              borderRadius: SIZES.radius,
              padding: SIZES.padding,
            },
          ]}
        /> */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            marginTop: SIZES.padding,
            backgroundColor:
              number.length > 0 ? COLORS.black : COLORS.lightGray,
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
                  color:
                    // number.length > 0 && password.length > 0
                    number.length > 0 ? COLORS.white : COLORS.gray,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                },
              ]}>
              Send Otp
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
