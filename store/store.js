import { createStore } from 'redux';
import reducer from './Reducers/RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['items'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const initialState = {
  items: [],
};

export const store = createStore(persistedReducer, initialState);
export const persistor = persistStore(store);
