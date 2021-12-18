import React from 'react';
import {View} from 'react-native';
import LocationView from 'react-native-location-view';
import appTheme from '../constants/theme';

const SelectAddressScreen = ({navigation, route, ...props}) => {
  let googlePlacesApiKey = `AIzaSyD-e9Ulh0qheVctMSqMGOhVBF1MuFHrbsA`;

  return (
    <View style={{flex: 1}}>
      <LocationView
        apiKey={'AIzaSyD-e9Ulh0qheVctMSqMGOhVBF1MuFHrbsA'}
        initialLocation={{
          latitude: 22.7196,
          longitude: 75.8577,
        }}
        actionButtonStyle={{
          borderRadius: 10,
          backgroundColor: appTheme.COLORS.black,
        }}
        actionTextStyle={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}
        onLocationSelect={({address, latitude, longitude, ...location}) => {
          // console.log(location);
          navigation.goBack();
          route.params.setAddress({
            address,
            latitude,
            longitude,
          });
        }}
      />
    </View>
  );
};

export default SelectAddressScreen;
