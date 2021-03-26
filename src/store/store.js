import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './Reducers/RootReducer';

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
