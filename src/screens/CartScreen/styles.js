import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  singleFlex: {
    flex: 1,
  },
  centerContent: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'red',
  },
  emptyListContent: {
    height: '100%',
  },
  populatedListContent: {
    marginVertical: 12,
  },
  emptyListContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyListImage: {
    height: 128,
    width: 128,
    resizeMode: 'contain',
  },
  emptyListHeader: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  emptyListSubtitle: {
    marginTop: 2,
  },
  listDivider: {
    marginVertical: 6,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  footerContainer: {
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(12, 86, 135, 0.2)',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(12, 86, 135, 0.1)',
    flexDirection: 'row',
  },
  footerSuccessBG: {
    backgroundColor: 'rgba(78, 159, 45, 0.2)',
  },
  subtotal: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.DARK_BLUE,
  },
  totalItems: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextButton: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    tintColor: colors.DARK_BLUE,
    marginStart: 12,
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  listItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  listItemContentContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemPrice: {
    fontSize: 12,
  },
  listItemSubtotal: {
    fontSize: 12,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: colors.DARK_BLUE,
  },
  counterStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  countStyle: {
    width: 28,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
  },
  countTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.DARK_BLUE,
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
