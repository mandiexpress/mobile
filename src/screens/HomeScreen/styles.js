import {StyleSheet} from 'react-native';
import {colors} from '../../shared/constants';
// import {RFValue} from 'react-native-responsive-fontsize';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';

// const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
  },
  bottomButton: {
    height: 80,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#4e9f2d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  seperatorStyle: {
    marginVertical: 2,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    alignSelf: 'center',
  },
});
