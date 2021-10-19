import { StyleSheet } from 'react-native';
import { fonts } from '../../shared/constants';

export default StyleSheet.create({
  backNav: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  backNavIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.REGULAR,
  },
});
