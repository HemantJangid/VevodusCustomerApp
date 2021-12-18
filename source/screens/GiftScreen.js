import axios from 'axios';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {TextField} from 'rn-material-ui-textfield';
import * as yup from 'yup';
import requestUrls from '../constants/requestUrls';
import {COLORS, FONTS} from '../constants/theme';

const GiftScreen = () => {
  const [loading, setLoading] = useState(false);
  const {userDetails} = useSelector(state => state.userReducer);

  const initialValues = {
    gift: '',
    userId: userDetails.userId,
  };

  const onSubmit = values => {
    setLoading(true);
    axios
      .post(`${requestUrls.baseUrl}${requestUrls.gift}`, values)
      .then(response => {
        setLoading(false);
        console.log(response);
        if (response.status === 201) {
          Alert.alert('Gift Request Failed', response.data, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        } else if (response.status === 200) {
          Alert.alert(
            'Request Sent Successfully',
            'Our team will contact you for further enquiries.',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          );
          formik.resetForm();
        }
      }).catch = err => {
      console.log(err);
    };
  };

  let validationSchema = yup.object().shape({
    gift: yup.string().required(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          width: '100%',
          flex: 1,
          alignItems: 'center',
          //   justifyContent: 'space-between',
          //   marginBottom: 90
        }}>
        <TextField
          multiline={true}
          label="Query"
          onChangeText={formik.handleChange('gift')}
          value={formik.values.gift}
          inputContainerStyle={{
            width: '100%',
          }}
          style={[FONTS.body3]}
          labelTextStyle={[FONTS.body3]}
          tintColor={COLORS.black}
          error={
            formik.errors.gift &&
            formik.touched.gift &&
            String(formik.errors.gift)
          }
          onBlur={formik.handleBlur('gift')}
        />
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
            <Text style={[{color: COLORS.white}, FONTS.h2]}>Submit Query</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    marginTop: 20,
  },
});
