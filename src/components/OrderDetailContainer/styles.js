import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '1%',
    paddingVertical: '1%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  contextContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 4,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 14,
    color: 'black',
  },
  counterStyle: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  countStyle: {
    width: 28,
    paddingVertical: 6,
    backgroundColor: colors.DARK_BLUE,
    borderRadius: 5,
    marginVertical: 8,
  },
  countTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.WHITE,
  },
  plusCount: {
    width: 15,
    height: 15,
  },
  minusCount: {
    width: 15,
    height: 15,
  },
});
