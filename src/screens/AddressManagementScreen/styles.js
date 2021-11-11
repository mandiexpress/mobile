import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  inputContainer: {
    padding: 24,
    backgroundColor: colors.WHITE,
    marginHorizontal: 12,
    borderRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    paddingVertical: 12,
    backgroundColor: colors.DARK_BLUE,
    borderRadius: 8,
    marginVertical: 14,
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    backgroundColor: 'red',
  },
  errorText: {
    color: 'red',
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
    marginTop: 12,
  },
  alreadyButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.BLACK,
    fontStyle: 'italic',
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
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  dropdownEnabledTextStyle: {
    fontWeight: '600',
    color: '#212121',
    fontSize: 12,
  },
  dropdownDisabledTextStyle: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
  },
  dropdownListItemLabelStyle: {
    fontSize: 12,
  },
  dropdownStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: colors.LIGHT_BLUE,
    borderRadius: 6,
  },
  dropdownSearchContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
  },
  dropdownModalContentContainerStyle: {
    margin: 12,
  },
  dropdownSearchTextInputStyle: {
    borderWidth: 0,
    paddingStart: 0,
  },
  dropdownListItemContainerStyle: {
    marginVertical: 4,
  },
  scrollViewStyle: {
    backgroundColor: 'white',
  },
  headerBackNavStyle: {
    marginStart: 8,
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputContentContainer: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    paddingVertical: 4,
    flexDirection: 'row',
  },
  inputIconStyle: {
    tintColor: colors.DARK_BLUE,
    width: 18,
    height: 18,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  inputStyle: {
    fontSize: 16,
    flex: 1,
    marginStart: 12,
    marginBottom: Platform.OS === 'ios' ? 12 : 0,
    color: colors.BLACK,
  },
  headerText: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    marginTop: 12,
  },
  disabledItemLabelStyle: {
    backgroundColor: 'gray',
  },
  bottomDivider: {
    marginBottom: 12,
  },
  maxBottomDivider: {
    marginBottom: 24,
  },
});
