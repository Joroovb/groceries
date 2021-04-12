import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TextInputCard from '../../src/components/TextInputCard';

describe('Correctly render TextInputCard', () => {
  it('should render with the correct elements', () => {
    const distpatch = jest.fn();
    const submitHandler = jest.fn();

    const { getByPlaceholderText } = render(
      <TextInputCard dispatch={distpatch} submitHandler={submitHandler} />,
    );

    getByPlaceholderText('Enter new product');
  });
});

describe('Correctly validate text input', () => {
  it('should not call dispatch if input is invalid', () => {
    const distpatch = jest.fn();
    const submitHandler = jest.fn();
    const { getByPlaceholderText } = render(
      <TextInputCard dispatch={distpatch} submitHandler={submitHandler} />,
    );

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Enter new product'), '');
    });
    fireEvent(getByPlaceholderText('Enter new product'), 'onSubmitEditing');
    expect(distpatch).not.toHaveBeenCalled();

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Enter new product'), ' ');
    });
    fireEvent(getByPlaceholderText('Enter new product'), 'onSubmitEditing');
    expect(distpatch).not.toHaveBeenCalled();
  });

  it('should call dispatch if input is valid', () => {
    const distpatch = jest.fn();

    const { getByPlaceholderText } = render(
      <TextInputCard dispatch={distpatch} />,
    );

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Enter new product'), 'Coffee');
    });

    fireEvent(getByPlaceholderText('Enter new product'), 'onSubmitEditing');

    expect(distpatch).toHaveBeenCalled();
  });
});
