import { StyleSheet } from 'react-native';
import { colors } from '../../shared/constants';

export default StyleSheet.create({
  dropdownEnabledTextStyle: {
    fontWeight: '600',
    color: '#212121',
    fontSize: 12,
  },
  dropdownDisabledTextStyle: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
  },
  dropdownListItemLabelStyle: {
    fontSize: 12,
  },
  dropdownStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    borderRadius: 6,
  },
  dropdownSearchContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
  },
  dropdownModalContentContainerStyle: {
    margin: 12,
  },
  dropdownSearchTextInputStyle: {
    borderWidth: 0,
    paddingStart: 0,
  },
  dropdownListItemContainerStyle: {
    marginVertical: 4,
  },
  disabledItemLabelStyle: {
    backgroundColor: 'gray',
  },
});
