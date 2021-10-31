import { StyleSheet } from 'react-native';
import { colors } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    // flex: 1,
    margin: 18,
  },
  headContainer: {
    // borderWidth: 0.01,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
  },
  headerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginStart: 12,
  },
  totalAmountContainer: {
    height: 40,
    alignItems: 'center',
    paddingHorizontal: '2%',
    backgroundColor: 'rgba(12, 86, 135, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  total: {
    color: 'white',
  },
  totalValue: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  button: {
    borderRadius: 6,
    backgroundColor: '#4e9f2d',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingVertical: 12,
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
  errorUnderline: {
    borderBottomColor: 'darkred',
  },
  normalUnderline: {
    borderBottomColor: colors.DARK_BLUE,
  },
  dropdownEnabledTextStyle: {
    fontWeight: '600',
    color: '#212121',
    fontSize: 12,
  },

  bottomDivider: {
    marginBottom: 12,
  },

  divider: {
    marginTop: 12,
  },
  dropdownDisabledTextStyle: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
  },
  textInputStyle: {
    flex: 1,
    color: colors.BLACK,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
