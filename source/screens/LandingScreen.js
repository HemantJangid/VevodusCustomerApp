import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../constants/styles';
import appTheme from '../constants/theme';

const LandingScreen = ({navigation}) => {
  function handleSignIn() {
    navigation.navigate('SignInScreen');
  }

  function handleSignUp() {
    navigation.navigate('SignUpScreen');
  }

  return (
    <View
      style={[
        globalStyles.screenContainer,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <TouchableOpacity style={styles.authButton} onPress={handleSignIn}>
        <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
          SignIn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={handleSignUp}>
        <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
          SignUp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  authButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.black,
    alignItems: 'center',
    marginTop: 20,
    width: 200,
  },
});
