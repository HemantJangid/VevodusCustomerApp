import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import globalStyles from '../constants/styles';
import appTheme, {COLORS, FONTS} from '../constants/theme';
import Geolocation from '@react-native-community/geolocation';
import {useFormik} from 'formik';
import Header from '../components/Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import requestUrls from '../constants/requestUrls';
import axios from 'axios';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';
import {ActivityIndicator} from 'react-native-paper';

const SignUpScreen = ({navigation, ...props}) => {
  const [profileImage, setProfileImage] = useState(
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300',
  );
  const [rerender, setRerender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: 'Select address on map',
    latitude: '',
    longitude: '',
  });

  function handleImageUpload() {
    console.log('trying to upload image');
    ImageCropPicker.openPicker({})
      .then(image => {
        setProfileImage(image);
        var data = new FormData();
        data.append('thefile', {
          uri: image.path,
          name: 'image.png',
          type: image.mime,
        });
        setRerender(!rerender);
      })
      .catch(e => console.log(e));
  }

  const initialValues = {
    name: '',
    mobile: '',
    emailAddress: '',
    password: 'admin',
  };

  let validationSchema = yup.object().shape({
    name: yup.string().required(),
    mobile: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    emailAddress: yup.string().required().email(),
  });

  const onSubmit = values => {
    setLoading(true);
    let signupData = {
      ...values,
      address: address.address,
      lat: address.latitude,
      lang: address.longitude,
      photoLength: 1,
    };
    console.log(signupData);

    var data = new FormData();
    Object.keys(signupData).forEach(key => data.append(key, signupData[key]));
    data.append('photos', {
      uri: profileImage.path,
      name: profileImage.path.substr(profileImage.path.lastIndexOf('/') + 1),
      type: profileImage.mime,
    });

    axios({
      method: 'post',
      url: `${requestUrls.baseUrl}${requestUrls.signUp}`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(response => {
      setLoading(false);
      if (response.status === 201) {
        Alert.alert('Sign Up', response.data, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else if (response.status === 200) {
        Alert.alert(
          'Sign Up',
          'User registered successfully. Login to continue!!',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
        formik.resetForm();
        setAddress({
          address: 'Select address on map',
          latitude: '',
          longitude: '',
        });
        navigation.goBack();
      }
    }).catch = err => {
      console.log(err);
    };
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const handleSelectAddress = () => {
    navigation.navigate('SelectAddressScreen', {
      setAddress,
      address,
    });
  };

  return (
    <>
      <Header name="SignUp" />
      <ScrollView style={[globalStyles.screenContainer]}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleImageUpload()}
            style={{
              height: 150,
              width: 150,
              backgroundColor: appTheme.COLORS.lightGray,
              borderRadius: 75,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Image
              source={{
                uri: profileImage.path,
              }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
              }}
            />
          </TouchableOpacity>
          <View style={styles.action}>
            {/* <FontAwesome name="user-o" color="#696969" size={20} /> */}
            <TextField
              label="Name"
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.name &&
                formik.touched.name &&
                String(formik.errors.name)
              }
              onBlur={formik.handleBlur('name')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Mobile"
              onChangeText={formik.handleChange('mobile')}
              value={formik.values.mobile}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.mobile &&
                formik.touched.mobile &&
                String(formik.errors.mobile)
              }
              onBlur={formik.handleBlur('mobile')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Email Address"
              onChangeText={formik.handleChange('emailAddress')}
              value={formik.values.emailAddress}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.emailAddress &&
                formik.touched.emailAddress &&
                String(formik.errors.emailAddress)
              }
              onBlur={formik.handleBlur('emailAddress')}
            />
          </View>
          <View style={styles.action}>
            <TextField
              label="Address"
              value={address.address}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              // error={
              //   'address is required'
              // }
            />
            <TouchableOpacity
              onPress={handleSelectAddress}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <Text style={[FONTS.body4, {textDecorationLine: 'underline'}]}>
                Pick on map
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.action}>
            <TextField
              label="Password"
              onChangeText={formik.handleChange('password')}
              value={formik.values.password}
              inputContainerStyle={{width: '100%'}}
              style={[FONTS.body3]}
              labelTextStyle={[FONTS.body3]}
              tintColor={COLORS.black}
              error={
                formik.errors.password &&
                formik.touched.password &&
                String(formik.errors.password)
              }
              onBlur={formik.handleBlur('password')}
            />
          </View> */}
          <TouchableOpacity
            style={styles.commandButton}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator
                color={COLORS.white}
                animating={true}
                size="small"
              />
            ) : (
              <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.black,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  action: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    // paddingBottom: 5,
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: '#05375a',
  },
});