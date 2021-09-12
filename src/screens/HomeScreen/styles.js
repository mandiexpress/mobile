import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../shared/constants';

// Screen Styles
export const screen = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.WHITE,
    padding: 12,
  },
  header: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
  },
  bottomButton: {
    height: 80,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#4e9f2d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  separatorStyle: {
    marginVertical: 2,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    alignSelf: 'center',
  },
  emptyListContentContainerStyle: {
    height: globalStyles.fullHeight,
  },
  listContentContainerStyle: {
    marginVertical: globalStyles.margins.mv_small,
  },
  appName: {
    fontSize: globalStyles.fontSizes.xlarge,
    fontWeight: 'bold',
  },
  viewPromotionsText: {
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: globalStyles.fontSizes.small,
    fontWeight: 'bold',
    color: '#212121',
  },
  title: {
    fontSize: globalStyles.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
    opacity: 0.3,
  },
  sectionContainer: {
    marginTop: 12,
  },
});

// Promotions List Item View Styles
export const promotionsListItemStyle = StyleSheet.create({
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    width: Dimensions.get('window').width - 26,
    height: 165,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#212121',
    alignItems: 'center',
  },
  textContainer: {
    flex: globalStyles.singleFlex,
  },
  validity: {
    color: 'white',
    fontSize: globalStyles.fontSizes.small,
    opacity: 0.5,
  },
  nextIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: 'white',
    transform: [{ rotate: '180deg' }],
    marginEnd: 12,
    opacity: 0.5,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  divider: {
    marginHorizontal: globalStyles.divider.large,
  },
});

// Category List Item View Styles
export const categoryListItemStyle = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: Platform.OS === 'android' ? 12 : 6,
  },
  title: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
  },
  discount: {
    marginTop: 1,
    fontSize: 12,
    color: 'black',
    opacity: 0.4,
  },
  footerContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#212121',
    marginStart: 12,
  },
  nextIcon: {
    width: 18,
    height: 18,
    tintColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
  moreText: {
    fontSize: 10,
    marginTop: 6,
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    marginHorizontal: globalStyles.divider.small,
  },
});

// Section Header Styles
export const sectionHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: globalStyles.fontSizes.medium,
    flex: 1,
    textTransform: 'uppercase',
  },
  viewMoreText: {
    flex: 1,
    textAlign: 'right',
    fontSize: globalStyles.fontSizes.small,
    fontWeight: 'bold',
    opacity: 0.4,
    alignSelf: 'center',
  },
});

export const productListStyle = StyleSheet.create({
  container: {
    width: 150,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 12,
  },
  image: { height: 100 },
  discountContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#212121',
  },
  discount: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  discountedPrice: {
    fontSize: 12,
    color: 'green',
    flex: 1,
  },
  price: {
    flex: 1,
    alignSelf: 'flex-end',
    textDecorationStyle: 'solid',
    textAlign: 'right',
    textDecorationLine: 'line-through',
    fontSize: 10,
    opacity: 0.5,
  },
  withoutDiscountPrice: {
    flex: 1,
    alignSelf: 'flex-end',
    textDecorationStyle: 'solid',
    textAlign: 'left',
    textDecorationLine: 'none',
    fontSize: 12,
    opacity: 1,
  },
  saved: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  addToCartContainer: {
    width: '100%',
    borderRadius: 4,
    marginTop: 6,
  },
  cartIncludedItemBG: {
    backgroundColor: '#b53127',
  },
  cartExcludedItemBG: {
    backgroundColor: 'green',
  },
  addToCartText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    paddingVertical: 6,
    fontWeight: 'bold',
  },
});
