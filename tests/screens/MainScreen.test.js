import React from 'react';
import { cleanup } from '@testing-library/react-native';
import MainScreen from '../../src/screens/MainScreen';
import { render as customRender } from '../utils/RenderWithNavigation';

jest.useFakeTimers();

describe('Correctly render MainScreen', () => {
  afterEach(cleanup);
  it('should render with correct elements', () => {
    const { getByTestId, queryAllByTestId } = customRender(<MainScreen />);

    getByTestId('FAB');
    expect(queryAllByTestId('listItem')).toHaveLength(0);
  });
});
