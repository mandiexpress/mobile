import { StyleSheet } from 'react-native';
import { colors } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  listContainer: {
    height: '100%',
  },
  emptyListContainer: {
    marginVertical: 12,
  },
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    alignSelf: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  itemContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderStatusIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 6,
    resizeMode: 'contain',
  },
  orderStatusContainer: {
    flex: 1,
    marginHorizontal: 12,
    justifyContent: 'space-evenly',
  },
  bold: {
    fontWeight: 'bold',
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderAddressText: {
    fontSize: 12,
    color: 'gray',
  },
  orderTimeAndPriceContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  smallText: {
    fontSize: 12,
  },
  orderTotalText: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderMoreInfo: {
    fontSize: 12,
    color: 'gray',
  },
});
