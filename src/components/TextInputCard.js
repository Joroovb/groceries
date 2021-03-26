import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { addItem } from '../store/Actions/ActionCreators';

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  textInput: { fontSize: 19, fontWeight: '500' },
});

const inputSchema = yup.string().required().min(2);

const TextInputCard = ({ dispatch }) => {
  const [text, setText] = useState('');

  const submitHandler = () => {
    const valid = inputSchema.isValidSync(text);
    if (valid) {
      dispatch(
        addItem({
          id: Date.now(),
          product: text,
          amount: 1,
          check: false,
        }),
      );
      setText('');
    }
  };

  return (
    <Card elevation={3} style={styles.card}>
      <Card.Content>
        <TextInput
          placeholder='Enter new product'
          blurOnSubmit={false}
          value={text}
          onChangeText={(e) => setText(e)}
          style={styles.textInput}
          onSubmitEditing={submitHandler}
        />
      </Card.Content>
    </Card>
  );
};

TextInputCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default TextInputCard;
