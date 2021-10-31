import firestore from '@react-native-firebase/firestore';
import { Dimensions } from 'react-native';

const iconPath = '../../assets/Icons';
const extension = '.png';

export const globalStyles = {
  singleFlex: 1,
  fullHeight: '100%',
  fullWidth: '100%',
  screenWidth: Dimensions.get('window').width,
  row: {
    flexDirection: 'row',
  },
  divider: {
    small: 6,
    large: 12,
  },
  margins: {
    mv_small: 12,
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 18,
    xlarge: 24,
    xxlarge: 32,
  },
  dateTimeFormat: 'MMM ddd, DD YYYY hh: mm A',
};

export const fonts = {
  REGULAR: 'Helvetica',
  LIGHT: 'Helvetica Light',
  BOLD: 'Helvetica Bold',
  BOLD_OBLIQUE: 'Helvetica Bold Oblique',
};

export const collections = {
  PROMOTIONS: 'Promotions',
  CATEGORIES: 'Categories',
  ORDERS: 'Orders',
  PRODUCTS: 'Products',
  USERS: 'Users',
  REVIEWS: 'reviews',
};

export const paths = {
  USERS: firestore().collection(collections.USERS),
  ORDERS: firestore().collection(collections.ORDERS),
};

export const routes = {
  CART_SCREEN: 'Cart',
  CHECKOUT_SCREEN: 'Checkout',
  LOGIN_SCREEN: 'Login',
  REGISTRATION_SCREEN: 'SignUp',
  PROFILE_SCREEN: 'Profile',
  ORDER_SCREEN: 'Orders',
  ORDER_DETAIL_SCREEN: 'OrderDetail',
  PROMOTION_DETAIL_SCREEN: 'PromotionDetail',
  PROMOTION_LIST_SCREEN: 'PromotionList',
  CATEGORIES_LIST_SCREEN: 'CategoriesList',
  PRODUCTS_LIST_SCREEN: 'ProductsList',
  PRODUCTS_DISCOUNT_SCREEN: 'ProductDiscountList',
  INTRODUCTION_SCREEN: 'Introduction',
  EDIT_PROFILE_SCREEN: 'EditProfile',
  STATISTICS_SCREEN: 'Statistics',
  TERMS_AND_CONDITIONS: 'TermsAndConditions',
  PRIVACY_POLICY: 'PrivacyPolicy',
  REGISTER_VERIFY_SCREEN: 'RegisterVerifyScreen',
  LOGIN_VERIFY_SCREEN: 'LoginVerifyScreen',
  ITEM_DETAIL_SCREEN: 'ItemDetailScreen',
  LIST_ADDRESS_SCREEN: 'ListAddressScreen',
  FAVORITE_LIST: 'FavoriteScreen',

  HOME_NAVIGATOR: 'HOME',
};

export const colors = {
  DARK_BLUE: '#0C5687',
  LIGHT_BLUE: 'rgba(12, 86, 135, 0.1)',
  WHITE: 'white',
  LIGHT_MANGO: '#F8D162',
  ORANGE: '#ce1a1a',
  PISTACHO: '#6AC6A5',
  BLACK: '#212121',
};

export const status = {
  CONFIRMATION: 'confirmation',
  PACKING: 'packing',
  ON_THE_WAY: 'on-the-way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
  WEATHER_ISSUES: 'weather-issues',
};

export const icons = {
  ADD: require(`${iconPath}/add${extension}`),
  MINUS: require(`${iconPath}/minus${extension}`),
  BIN: require(`${iconPath}/ic_bin${extension}`),
  CART: require(`${iconPath}/ic_cart${extension}`),
  HOME: require(`${iconPath}/ic_home${extension}`),
  ORDER: require(`${iconPath}/ic_order_list${extension}`),
  PROFILE: require(`${iconPath}/ic_user${extension}`),
  FACEBOOK: require(`${iconPath}/facebook${extension}`),
  GOOGLE: require(`${iconPath}/gmail${extension}`),
  BACK: require(`${iconPath}/ic_previous${extension}`),
  SHOW_PASSWORD: require(`${iconPath}/ic_eye${extension}`),
  HIDE_PASSWORD: require(`${iconPath}/ic_invisible${extension}`),
  NEXT_ICON: require(`${iconPath}/ic_next${extension}`),
  EMPTY_CART: require(`${iconPath}/empty-cart${extension}`),
  DELETE: require(`${iconPath}/ic_delete${extension}`),
  NEXT_FILLED: require(`${iconPath}/ic_next_filled${extension}`),
  LOGO_WHITE: require(`${iconPath}/ic_logo-white${extension}`),

  CONFIRMATION: require(`${iconPath}/ic_confirmation${extension}`),
  PACKING: require(`${iconPath}/ic_packing${extension}`),
  ON_THE_WAY: require(`${iconPath}/ic_delivery${extension}`),
  DELIVERED: require(`${iconPath}/ic_delivered${extension}`),
  CANCELLED: require(`${iconPath}/ic_cancelled${extension}`),
  DELAYED: require(`${iconPath}/ic_delayed${extension}`),
  WEATHER_ISSUES: require(`${iconPath}/ic_weather_issues${extension}`),
  NEXT_ARROW: require(`${iconPath}/ic_next_arrow${extension}`),

  // Introduction Screen
  EXPRESS_DELIVERY: require(`${iconPath}/ic_express_delivery${extension}`),
  WALLET: require(`${iconPath}/ic_wallet${extension}`),
  GROCERY_ITEMS: require(`${iconPath}/ic_grocery_items${extension}`),
  ORDER_TRACKING: require(`${iconPath}/ic_order_tracking${extension}`),

  // Profile Screen
  EDIT: require(`${iconPath}/ic_edit${extension}`),
  TERMS_AND_CONDITIONS: require(`${iconPath}/ic_terms_and_conditions${extension}`),
  PRIVACY_POLICY: require(`${iconPath}/ic_privacy_policy${extension}`),
  STATISTICS: require(`${iconPath}/ic_statistics${extension}`),
  LOG_OUT: require(`${iconPath}/ic_logout${extension}`),
  DEFAULT_PROFILE_IMAGE: require(`${iconPath}/ic_default_user${extension}`),
  ADDRESS: require(`${iconPath}/ic_address${extension}`),

  // Register Screen
  PERSON: require(`${iconPath}/ic_person${extension}`),
  PHONE: require(`${iconPath}/ic_phone${extension}`),
  HOME_NUMBER: require(`${iconPath}/ic_home_number${extension}`),
  REGISTER_BG: require(`${iconPath}/ic_register_wallpaper.jpeg`),

  // Code Verification Screen
  OTP: require(`${iconPath}/ic_otp${extension}`),

  // Item Detail SCREEN
  CLOSE: require(`${iconPath}/ic_close${extension}`),
  LIKE: require(`${iconPath}/ic_like${extension}`),
  SHARE: require(`${iconPath}/ic_share${extension}`),

  // Edit Profile Screen
  DROP_DOWN: require(`${iconPath}/ic_drop_down${extension}`),
  MALE: require(`${iconPath}/ic_male${extension}`),
  FEMALE: require(`${iconPath}/ic_female${extension}`),
  OTHER: require(`${iconPath}/ic_star${extension}`),
  TICK: require(`${iconPath}/ic_tick${extension}`),
  GENDER: require(`${iconPath}/ic_gender${extension}`),
};

export const images = {
  AUTH: require('../../assets/Images/auth.jpg'),
  WELCOME: require('../../assets/Images/welcome.jpg'),
  IMAGE_PICKER: require('../../assets/Images/image-picker.png'),
};
