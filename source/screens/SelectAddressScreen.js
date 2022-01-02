import React from 'react';
import {View} from 'react-native';
import LocationView from 'react-native-location-view';
import appTheme from '../constants/theme';

const SelectAddressScreen = ({navigation, route, ...props}) => {
  let googlePlacesApiKey = `AIzaSyD-e9Ulh0qheVctMSqMGOhVBF1MuFHrbsA`;
  let {address, setAddress, setIsModalOpen} = route.params;

  return (
    <View style={{flex: 1}}>
      <LocationView
        apiKey={'AIzaSyD-e9Ulh0qheVctMSqMGOhVBF1MuFHrbsA'}
        initialLocation={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        actionButtonStyle={{
          borderRadius: 10,
          backgroundColor: appTheme.COLORS.black,
        }}
        actionTextStyle={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}
        onLocationSelect={({address, latitude, longitude, ...location}) => {
          navigation.goBack();
          setAddress({
            address,
            latitude,
            longitude,
          });
          if (setIsModalOpen) {
            setIsModalOpen(true);
          }
        }}
      />
    </View>
  );
};

export default SelectAddressScreen;
