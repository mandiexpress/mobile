import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../shared/constants';

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
    fontSize: 12,
  },
  emptyCartContainer: {
    paddingHorizontal: 12,
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
  },
  emptyListContent: {
    height: '100%',
  },
  populatedListContent: {
    paddingVertical: 12,
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
    marginHorizontal: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
  },
  subtotal: {
    fontFamily: fonts.BOLD,
    color: colors.DARK_BLUE,
  },
  totalItems: {
    fontFamily: fonts.BOLD,
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
    width: 75,
    height: 75,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listItemContentContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },
  listItemPrice: {
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    marginTop: 6,
  },
  listItemSubtotal: {
    fontSize: 12,
    alignSelf: 'flex-end',
    fontFamily: fonts.BOLD,
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
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
  },
  countTextStyle: {
    fontFamily: fonts.BOLD,
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
