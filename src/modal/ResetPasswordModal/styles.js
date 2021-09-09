import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 20,
    backgroundColor: colors.DARK_BLUE,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  loginButton: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: colors.ORANGE,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 12,
    marginEnd: 16,
  },
  forgetButton: {
    color: colors.ORANGE,
    textAlign: 'right',
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    height: 44,
    marginHorizontal: 20,
    width: 44,
  },
  alreadyTextContainer: {
    paddingHorizontal: '5%',
  },
  alreadyButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  registerText: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
  },
});
