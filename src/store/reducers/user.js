import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { collections } from '../../shared/constants';

export const loginUser = createAsyncThunk('user/loginUser', async uid => {
  try {
    const userDoc = await firestore()
      .collection(collections.USERS)
      .doc(uid)
      .get();

    return { ...userDoc.data(), id: userDoc.id };
  } catch (err) {
    throw err;
  }
});

export const fetchInfo = createAsyncThunk('user/fetchInfo', async payload => {
  try {
    const userDoc = await firestore()
      .collection(collections.USERS)
      .doc(payload)
      .get();
    if (!userDoc.exists) {
      throw 'auth/user-not-found';
    }

    return { ...userDoc.data(), id: userDoc.id };
  } catch (err) {
    throw err;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
    firstTime: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
    disableIntroduction: state => {
      state.firstTime = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    [fetchInfo.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, disableIntroduction } = userSlice.actions;
export default userSlice.reducer;
