import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: 150,
    marginEnd: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 12,
  },
  image: {
    height: 100,
  },
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
    backgroundColor: 'green',
  },
  cartIncludedContainer: {
    borderRadius: 4,
    marginTop: 6,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  quantityActionContainer: {
    backgroundColor: 'green',
    height: 24,
    width: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  decrementActionContainer: {
    backgroundColor: 'darkred',
  },
  quantityActionImage: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: 'white',
  },

  quantityText: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 6,
    fontSize: 16,
    fontWeight: 'bold',
  },
});