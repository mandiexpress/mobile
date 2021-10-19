import { StyleSheet } from 'react-native';
import { fonts, globalStyles } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginEnd: 6,
  },
  image: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    width: '100%',
    height: 120,
  },
  detailContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
  },
  textContainer: {
    flex: globalStyles.singleFlex,
  },
  validity: {
    color: 'black',
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
    fontFamily: fonts.REGULAR,
  },
  nextIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    opacity: 0.2,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    fontFamily: fonts.REGULAR,
    color: 'black',
    fontSize: globalStyles.fontSizes.medium,
  },
});
