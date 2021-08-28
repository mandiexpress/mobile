import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    // flex: 1,
    margin: 18,
  },
  headContainer: {
    backgroundColor: 'white',
    borderWidth: 0.01,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: '5%',
    padding: '2%',
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
});
