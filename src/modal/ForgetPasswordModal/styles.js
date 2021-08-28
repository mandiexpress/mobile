import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';

export default StyleSheet.create({
  registerButton: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    marginEnd: 24,
    alignItems: 'center',
    marginBottom: 9,
  },
  backButton: {
    paddingVertical: 20,
    backgroundColor: colors.DARK_BLUE,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: colors.ORANGE,
    fontSize: 12,
    alignSelf: 'flex-start',
    top: 3,
  },
});
