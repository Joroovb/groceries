import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ListItem from '../../src/components/ListItem';

describe('Correctly render ListItem', () => {
  it('should render the correct elements', () => {
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };
    const dispatch = jest.fn();
    const drag = jest.fn();
    const isActive = false;
    const { getByText } = render(
      <ListItem
        item={item}
        dispatch={dispatch}
        drag={drag}
        isActive={isActive}
      />,
      { wrapper: PaperProvider },
    );
    getByText('Coffee');
  });
});
