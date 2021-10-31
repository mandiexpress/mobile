import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { collections } from '../../shared/constants';

export async function uploadImage(payload) {
  try {
    const { uri, userId, ext } = payload;
    const path = `Users/${userId}/pp.${ext}`;
    const ref = storage().ref(path);
    await ref.putFile(uri);
    return await ref.getDownloadURL();
  } catch (err) {
    throw err;
  }
}

export async function updateUser(userId, payload) {
  try {
    await firestore().collection(collections.USERS).doc(userId).update(payload);
  } catch (err) {
    throw err;
  }
}
