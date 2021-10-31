import { Platform, StyleSheet } from 'react-native';
import { fonts, globalStyles } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    borderRadius: Platform.OS === 'android' ? 12 : 6,
  },
  title: {
    marginTop: 6,
    fontFamily: fonts.REGULAR,
    color: 'black',
  },
  discount: {
    marginTop: 2,
    fontSize: 12,
    color: 'black',
    opacity: 0.4,
  },
  footerContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginStart: 12,
  },
  nextIcon: {
    width: 18,
    height: 18,
    tintColor: 'black',
    transform: [{ rotate: '180deg' }],
  },
  moreText: {
    fontSize: 10,
    marginTop: 6,
    color: 'black',
    fontWeight: 'bold',
  },
  divider: {
    marginHorizontal: globalStyles.divider.small,
  },
});
