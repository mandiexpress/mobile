import { StyleSheet } from 'react-native';
import { fonts } from '../../shared/constants';

export default StyleSheet.create({
  modalStyle: {
    marginHorizontal: 24,
    marginVertical: 12,
  },
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingBottom: 6,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  headingStyle: {
    fontSize: 18,
    fontFamily: fonts.BOLD,
    flex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  listContentContainerStyle: {
    marginVertical: 12,
  },
  listItemSeparatorComponent: {
    width: '95%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemContainerStyle: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  itemIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginEnd: 12,
  },
  itemChecked: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginEnd: 12,
    tintColor: 'green',
  },
  itemLabel: {
    flex: 1,
    fontFamily: fonts.REGULAR,
  },
});
