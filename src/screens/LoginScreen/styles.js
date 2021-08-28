import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  button: {
    paddingVertical: 16,
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
    color: 'darkred',
    marginTop: 2,
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    textAlign: 'right',
    marginBottom: 6,
    alignSelf: 'flex-end',
  },
  forgetButton: {
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic',
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

  alreadyButtonText: {
    fontSize: 14,
  },
  registerText: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
  },
});
