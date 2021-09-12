import { Dimensions } from 'react-native';

const iconPath = '../../../assets';
const extension = '.png';

export const globalStyles = {
  singleFlex: 1,
  fullHeight: '100%',
  fullWidth: '100%',
  screenWidth: Dimensions.get('window').width,
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
  dateTimeFormat: 'ddd, DD YYYY hh:mm A',
};

export const collections = {
  PROMOTIONS: 'Promotions',
  CATEGORIES: 'Categories',
  ORDERS: 'Orders',
  PRODUCTS: 'Products',
  USERS: 'Users',
};

export const routes = {
  CART_SCREEN: 'Cart',
  CHECKOUT_SCREEN: 'Checkout',
  LOGIN_SCREEN: 'Login',
  REGISTRATION_SCREEN: 'SignUp',
  PROFILE_SCREEN: 'Profile',
  ORDER_SCREEN: 'Orders',
  ORDER_DETAIL_SCREEN: 'OrderDetail',

  HOME_NAVIGATOR: 'HOME',
};

export const colors = {
  DARK_BLUE: '#0C5687',
  WHITE: 'white',
  LIGHT_MANGO: '#F8D162',
  ORANGE: '#ce1a1a',
  PISTACHO: '#6AC6A5',
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
};
