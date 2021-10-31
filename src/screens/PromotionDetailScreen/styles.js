import { StyleSheet } from 'react-native';
import { fonts } from '../../shared/constants';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  description: {
    fontFamily: fonts.REGULAR,
    lineHeight: 18,
  },
  leftOverContainer: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    marginTop: 12,
  },
  leftOver: {
    fontSize: 12,
    color: 'black',
    opacity: 0.5,
    fontFamily: fonts.REGULAR,
    marginVertical: 6,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0 ,0, 0, 0.1)',
    marginVertical: 12,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  startedOn: {
    fontSize: 12,
    marginTop: 6,
    color: 'gray',
    flex: 1,
    textAlign: 'center',
  },
  endedOn: {
    fontSize: 12,
    marginTop: 6,
    color: 'gray',
    flex: 1,
    textAlign: 'center',
  },
  textContainer: {
    paddingHorizontal: 12,
  },
  similarHeading: {
    fontSize: 14,
    color: 'black',
    opacity: 0.5,
    fontFamily: fonts.REGULAR,
    fontWeight: '400',
    marginBottom: 12,
  },
  similarContainer: {
    paddingHorizontal: 12,
  },
});
