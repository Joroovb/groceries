import React from 'react';
import { render } from '@testing-library/react-native';
// import { render } from '@testing-library/react-native';
// import { render } from '../utils/RenderWithStyle';
import { shallow } from 'enzyme';
import { Provider as PaperProvider } from 'react-native-paper';
import ListItem from '../../src/components/ListItem';

describe('Correctly render ListItem', () => {
  it('should render the correct elements', () => {
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };
    const dispatch = jest.fn();
    const drag = jest.fn();
    const isActive = false;
    const { getByText, getByTestId } = render(
      <ListItem
        item={item}
        dispatch={dispatch}
        drag={drag}
        isActive={isActive}
      />,
      { wrapper: PaperProvider },
    );
    getByText('Coffee');
    getByTestId('menu-button');
  });
});

describe('Correctly open and close menu', () => {
  it('should render with menu closed', () => {
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };
    const dispatch = jest.fn();
    const drag = jest.fn();
    const isActive = false;
    const { queryByText } = render(
      <ListItem
        item={item}
        dispatch={dispatch}
        drag={drag}
        isActive={isActive}
      />,
    );
    expect(queryByText('delete')).toBeNull();
  });
  it('should work now plz', () => {
    const item = { id: Date.now(), product: 'Coffee', amount: 1, check: false };
    const dispatch = jest.fn();
    const drag = jest.fn();
    const isActive = false;
    const component = shallow(
      <ListItem
        item={item}
        dispatch={dispatch}
        drag={drag}
        isActive={isActive}
      />,
    );

    component.find('CustomMenu').simulate('click');
  });
});
