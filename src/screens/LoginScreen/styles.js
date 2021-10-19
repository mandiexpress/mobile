import { StyleSheet } from 'react-native';
import { colors } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: colors.DARK_BLUE,
    borderWidth: 0.5,
  },
  loginButton: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.DARK_BLUE,
  },
  errorText: {
    color: 'darkred',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 8,
    textAlign: 'right',
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
