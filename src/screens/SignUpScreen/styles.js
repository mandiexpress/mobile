import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    // flex: 1,
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
  buttonContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
  },
  errorText: {
    color: 'darkred',
    marginTop: 2,
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    textAlign: 'right',
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  alreadyTextContainer: {
    padding: '5%',
  },
  alreadyButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  loginText: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpIcon: {
    height: 44,
    marginHorizontal: 20,
    width: 44,
  },
  registerButton: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});
