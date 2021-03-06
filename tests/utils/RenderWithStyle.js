import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { render } from '@testing-library/react-native';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => (
  <PaperProvider>{children}</PaperProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
