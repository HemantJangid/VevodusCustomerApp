import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#185ADB', // Light purple
  secondary: '#5D2DFD', // Dark purple

  white: '#fff',
  black: '#000000',
  green: '#37E39F',
  red: '#F9A8BA',
  gray: '#6A6A6A',
  lightGray: '#dbdbdb',
  lightGray1: '#f5f6fa',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
};

export const baseContainer = {
  flex: 1,
};

export const CARDS = {
  card1: {
    backgroundColor: '#0A1931',
  },
  card2: {
    backgroundColor: '#185ADB',
  },
  card3: {
    backgroundColor: '#492F10',
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: {fontFamily: 'Montserrat-Black', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body5,
    lineHeight: 16,
  },
};

const appTheme = {COLORS, SIZES, FONTS, CARDS, baseContainer};

export default appTheme;
