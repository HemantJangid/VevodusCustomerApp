import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../constants/styles';

const Header = ({navigation, ...props}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.showBack && (
          <Icon
            name="arrow-left"
            color="black"
            size={25}
            onPress={() => navigation.goBack()}
          />
        )}
        <Text
          style={[styles.headerTitle, {marginLeft: props.showBack ? 15 : 0}]}>
          {props.name}
        </Text>
      </View>
      {props.button && (
        <Icon
          name={props.button}
          color="black"
          size={30}
          onPress={() => navigation.navigate('ProductDetails')}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
});
