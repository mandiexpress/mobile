import { StyleSheet } from 'react-native';
import { fonts, globalStyles } from '../../shared/constants';

// Section Header Styles
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  title: {
    color: 'black',
    fontSize: globalStyles.fontSizes.medium,
    fontFamily: fonts.REGULAR,
  },
});
