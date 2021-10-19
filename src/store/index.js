import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cart';
import userReducer from './reducers/user';

// Persistent Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'user', 'grocery'],
};

// Reducers
const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

// Applying Persistence using Reducers
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: [thunk, logger],
});

export const persist = persistStore(store);
