import { StyleSheet } from 'react-native';
import { fonts } from '../../shared/constants';

export default StyleSheet.create({
  seeAllContainer: {
    width: 150,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  seeAllIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'black',
  },
  seeAllText: {
    textAlign: 'center',
    fontFamily: fonts.BOLD,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 12,
    paddingHorizontal: 12,
  },
});
