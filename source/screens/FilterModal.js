import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import requestUrls from '../constants/requestUrls';
import appTheme, {COLORS, FONTS, SIZES} from '../constants/theme';

// import {Checkbox} from 'react-native-paper';

// const categories = [
//   {label: 'Shoes', value: 'shoes'},
//   {label: 'Shirts', value: 'shirts'},
//   {label: 'T-Shirts', value: 't-shirts'},
//   {label: 'Jeans', value: 'jeans'},
//   {label: 'Mobiles', value: 'mobiles'},
//   {label: 'Television', value: 'television'},
// ];

const FilterModal = ({
  isVisible,
  onClose,
  filters,
  setFilters,
  filterProducts,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [selectedCategories, setSelectedCategories] = useState(filters);
  const [categories, setCategories] = useState([]);
  const [rerender, setRerender] = useState(true);
  const [selectedActiveInactive, setSelectedActiveInactive] = useState('Both');

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    axios
      .get(`${requestUrls.baseUrl}${requestUrls.categories}`)
      .then(response => {
        if (response.status === 200) {
          let temp = response.data;
          let categories = temp.categories;
          let uniqueCategories = [];
          for (let i = 0; i < categories.length; i++) {
            let addCategory = true;
            for (let j = 0; j < uniqueCategories.length; j++) {
              if (categories[i].categoryName === uniqueCategories[j].label) {
                addCategory = false;
                break;
              }
            }
            if (addCategory)
              uniqueCategories.push({
                label: categories[i].categoryName,
                value: categories[i].categoryId,
              });
          }
          // uniqueCategories.push({
          //   value: -1,
          //   label: 'Other',
          // });
          setCategories(uniqueCategories);
          setRerender(!rerender);
        }
      }).catch = err => {
      console.log(err);
    };
  }

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, 0],
  });

  function onSelectionsChange(selectedCategories) {
    // selectedCategories is array of { label, value }
    setSelectedCategories(selectedCategories);
  }

  function applyFilters() {
    setFilters(selectedCategories);
    setShowFilterModal(false);
  }

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
          <View style={styles.container}>
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

          {/* Active Inactive
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
          </View> */}

          <TouchableOpacity style={styles.commandButton} onPress={applyFilters}>
            <Text style={[{color: appTheme.COLORS.white}, appTheme.FONTS.h2]}>
              Apply Filters
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: appTheme.COLORS.black,
    alignItems: 'center',
    marginTop: 20,
  },
});
