import { StyleSheet } from 'react-native';
import { fonts } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartButtonContainer: {
    paddingHorizontal: 24,
  },
  cartImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  contentContainer: {
    padding: 16,
  },
  contentDetailContainer: {
    flexDirection: 'row',
  },
  initialContentContainer: {
    flex: 1,
  },
  productTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 21,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  ratingStarContainerStyle: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    marginStart: 6,
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: fonts.BOLD,
    letterSpacing: 1,
    color: 'gray',
  },
  discountText: {
    flex: 1,
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: 'green',
    textAlign: 'left',
    marginTop: 12,
  },
  savingText: {
    flex: 1,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: 'green',
    textAlign: 'left',
    marginTop: 6,
  },
  favoriteContainer: {
    padding: 12,
  },
  favoriteIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  unclickedFavoriteIcon: {
    tintColor: 'rgba(0, 0, 0, 0.5)',
  },
  sectionContainer: {
    marginTop: 12,
  },
  sectionTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 21,
    color: 'rgba(0, 0, 0, 0.2)',
  },
  descriptionText: {
    fontFamily: fonts.REGULAR,
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    textAlign: 'center',
  },
  normalPriceColor: {
    color: 'black',
  },
  discountPriceColor: {
    color: 'green',
  },
  withoutDiscountPrice: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flex: 1,
  },
  selectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  decrementContainer: {
    height: 24,
    width: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkred',
  },
  quantityIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  quantityText: {
    flex: 0.5,
    textAlign: 'center',
    marginHorizontal: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
  incrementContainer: {
    backgroundColor: 'green',
    height: 24,
    width: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  addToCartContainer: {
    borderRadius: 4,
    backgroundColor: 'green',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
