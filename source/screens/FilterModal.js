import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectMultiple from 'react-native-select-multiple';

import {RadioButton} from 'react-native-paper';

import {COLORS, FONTS, SIZES} from '../constants/theme';
// import {Checkbox} from 'react-native-paper';

const categories = [
  {label: 'Shoes', value: 'shoes'},
  {label: 'Shirts', value: 'shirts'},
  {label: 'T-Shirts', value: 't-shirts'},
  {label: 'Jeans', value: 'jeans'},
  {label: 'Mobiles', value: 'mobiles'},
  {label: 'Television', value: 'television'},
];

const FilterModal = ({isVisible, onClose}) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActiveInactive, setSelectedActiveInactive] = useState('Both');

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 550],
  });

  function onSelectionsChange(selectedCategories) {
    // selectedCategories is array of { label, value }
    setSelectedCategories(selectedCategories);
  }

  console.log(selectedCategories, selectedActiveInactive);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentBlack}}>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <Text style={FONTS.h2}>Filter your search</Text>
            <TouchableOpacity
              onPress={() => setShowFilterModal(false)}
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="close-circle" color={COLORS.black} size={30} />
            </TouchableOpacity>
          </View>

          {/* Catergory Filter */}
          <View>
            <Text style={[FONTS.body2, {marginBottom: SIZES.base}]}>
              Categories
            </Text>
            <SelectMultiple
              renderLabel={(label, style) => {
                return <Text style={FONTS.body3}>{label}</Text>;
              }}
              items={categories}
              selectedItems={selectedCategories}
              onSelectionsChange={onSelectionsChange}
              rowStyle={{borderBottomWidth: 0, padding: 5}}
            />
          </View>

          {/* Active Inactive */}
          <View style={{marginTop: 10}}>
            <Text style={[FONTS.body2, {marginBottom: SIZES.base}]}>
              Active/Inactive
            </Text>
            <RadioButton.Group
              onValueChange={newValue => setSelectedActiveInactive(newValue)}
              value={selectedActiveInactive}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="both" color={COLORS.gray} />
                <Text style={FONTS.body3}>Both</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="active" color={COLORS.gray} />
                <Text style={FONTS.body3}>Active</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="inactive" color={COLORS.gray} />
                <Text style={FONTS.body3}>Inactive</Text>
              </View>
            </RadioButton.Group>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
