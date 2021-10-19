import firestore from '@react-native-firebase/firestore';
import { collections } from '../../shared/constants';

export async function fetchUser(phoneNumber) {
  try {
    const { size } = await firestore()
      .collection(collections.USERS)
      .where('contact.local', '==', phoneNumber)
      .get();
    if (size === 0) {
      throw 'auth/user-not-found';
    } else {
      return true;
    }
  } catch (err) {
    throw err;
  }
}
