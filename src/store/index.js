import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers, compose} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import cartReducer from './reducers/cart';
import userReducer from './reducers/user';

// Persistent Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'user'],
};

// Reducers
const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

// Applying Persistence using Reducers
const persistedReducer = persistReducer(persistConfig, reducers);

// Changing default configuration for middleware
const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

let enhancedCompose = compose;
if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: enhancedCompose(middleware),
});

export const persist = persistStore(store);
