import { StyleSheet } from 'react-native';
import { fonts, globalStyles } from '../../shared/constants';

export default StyleSheet.create({
  divider: {
    marginHorizontal: globalStyles.divider.small,
  },
  seeMoreContainer: {
    flex: 1,
    width: 200,
    borderRadius: 6,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  seeMoreIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'black',
  },
  seeMoreText: {
    fontFamily: fonts.BOLD,
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
  },
});
