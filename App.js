import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import MainTab from './src/navigators/MainTab';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0c8162',
    accent: '#f3db5a',
  },
};

const combinedTheme = {
  ...NavigationDefaultTheme,
  ...theme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...theme.colors,
  },
};

// <StatusBar style='auto' />

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={combinedTheme}>
          <NavigationContainer theme={combinedTheme}>
            <StatusBar />
            <MainTab />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
