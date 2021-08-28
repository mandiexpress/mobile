import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const loginUser = createAsyncThunk('user/loginUser', async payload => {
  try {
    const {email, password} = payload;
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    const userId = user.uid;
    const userDoc = await firestore().collection('Users').doc(userId).get();
    if (!userDoc.exists) {
      await auth().signOut();
      throw new Error('auth/no-user-found');
    }
    return {...userDoc.data(), id: userDoc.id};
  } catch (err) {
    throw err;
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async payload => {
    try {
      const {email, password, name, phone, address} = payload;
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userId = user.uid;

      const userModal = {
        email,
        name,
        phone,
        address,
        createdAt: firestore.FieldValue.serverTimestamp(),
        totalOrders: 0,
        image: null,
        id: userId,
      };
      await firestore().collection('Users').doc(userId).set(userModal);

      const {docs} = await firestore()
        .collection('Orders')
        .where('phone', '==', phone)
        .get();
      if (docs.length > 0) {
        for (const order of docs) {
          await firestore().collection('Orders').doc(order.id).update({
            placedBy: userId,
          });
        }
      }
      return userModal;
    } catch (err) {
      throw err;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;
