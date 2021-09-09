import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../shared/constants';

const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headText: {
    marginTop: hp('12%'),
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: RFValue(24, height),
    marginHorizontal: wp('10%'),
  },
  otpContainer: {
    position: 'absolute',
    paddingHorizontal: wp('20%'),
    marginTop: hp('25%'),
  },
  resendText: {
    color: '#B4B4B4',
    textAlign: 'center',
    fontSize: RFValue(16, height),
    fontWeight: '400',
    marginTop: hp('3%'),
  },
  expireText: {
    color: '#B4B4B4',
    textAlign: 'center',
    fontSize: RFValue(18, height),
    fontWeight: '400',
    marginTop: hp('15%'),
  },
  textinvalid: {
    color: colors.DARK_BLUE,
    fontWeight: 'bold',
  },
  textvalid: {
    color: 'grey',
  },
  resendContainer: {
    paddingHorizontal: 4,
  },
  // borderStyleHighLighted: {
  //   borderColor: '#79DF89',
  // },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.BLACK,
    fontSize: RFValue(16, height),
    fontWeight: '500',
    borderColor: 'grey',
    // backgroundColor: 'grey',
  },
  underlineStyleHighLighted: {
    borderColor: colors.DARK_BLUE,
  },
  time: {
    color: colors.BLACK,
    fontSize: RFValue(18, height),
    fontWeight: '500',
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
});
