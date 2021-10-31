import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../shared/constants';

export default StyleSheet.create({
  modalStyle: {
    marginHorizontal: '5%',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: fonts.BOLD,
  },
  messageStyle: {
    marginTop: 6,
    marginBottom: 18,
    marginHorizontal: 21,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.REGULAR,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  leftButtonStyle: {
    flex: 1,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderTopColor: colors.LIGHT_BLUE,
    borderEndColor: colors.LIGHT_BLUE,
    borderBottomColor: colors.LIGHT_BLUE,
    borderBottomWidth: 1,
  },
  rightButtonStyle: {
    flex: 1,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.LIGHT_BLUE,
    borderBottomColor: colors.LIGHT_BLUE,
    borderBottomWidth: 1,
  },
  actionButtonTextStyle: {
    color: colors.DARK_BLUE,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dismissContainer: {
    paddingVertical: 16,
  },
  dismissTextStyle: {
    fontFamily: fonts.BOLD,
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
