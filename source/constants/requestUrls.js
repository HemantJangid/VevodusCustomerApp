export default {
  baseUrl: 'http://65.0.17.153:3000/api/v1/',
  products: 'product/getProducts',
  login: 'user/validate',
  changeQuantity: 'product/changeQuantity',
  signUp: 'user/signup',
  categories: 'getAllCategoriesAndBrands',
  productImages: 'product/getPhotosLink',
  productAttributes: 'product/getProductAttrs',
  changeStatus: 'product/liveStatusChanged',
  photoupload: 'photoupload',
  shops: 'getAllShops',
  placeOrder: 'product/checkout',
  sendOTP: 'sendOTP',
  verityOTP: 'verifyOTP',
  gift: 'user/gift',
  ordersHistory: 'customer/history',
  orderDetails: 'checkoutInfo',
  cities: 'getAllCities',
  search: 'search',
};
