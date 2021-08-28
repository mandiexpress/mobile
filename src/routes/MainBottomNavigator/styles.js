import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  imageStyle: {
    top: 7,
    height: 23,
    width: 23,
  },
  moreStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: '#75737E',
    fontSize: RFValue(11, height),
    marginTop: hp('1.5%'),
    marginBottom: hp('0.4%'),
  },
});
