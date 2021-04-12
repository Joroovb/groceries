import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import configureStore from 'redux-mock-store';
import MainTab from '../../src/navigators/MainTab';

const mockStore = configureStore([]);

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  const initialState = {
    items: [],
  };

  const store = mockStore(initialState);
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainTab>{children}</MainTab>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
