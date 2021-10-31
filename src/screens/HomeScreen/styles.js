import { StyleSheet } from 'react-native';
import { colors, fonts, globalStyles } from '../../shared/constants';

// Screen Styles
export default StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
  },
  headerTitleStyle: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  divider: {
    marginVertical: 6,
  },
  container: {
    backgroundColor: colors.WHITE,
    padding: 12,
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
  separatorStyle: {
    marginVertical: 2,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '90%',
    alignSelf: 'center',
  },
  emptyListContentContainerStyle: {
    height: globalStyles.fullHeight,
  },
  listContentContainerStyle: {
    marginVertical: globalStyles.margins.mv_small,
  },
  appName: {
    fontSize: globalStyles.fontSizes.xlarge,
    flex: 1,
    fontFamily: fonts.BOLD,
  },
  viewPromotionsText: {
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: globalStyles.fontSizes.small,
    fontWeight: 'bold',
    color: '#212121',
  },
  title: {
    fontSize: globalStyles.fontSizes.medium,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
    opacity: 0.3,
  },
  authContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingEnd: 12,
  },
  profileImage: {
    width: 24,
    height: 24,
  },
  avatarContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginEnd: 12,
  },
  avatarTitleStyle: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
