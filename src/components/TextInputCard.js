import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { addItem } from '../store/Actions/ActionCreators';

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  textInput: { fontSize: 19, fontWeight: '500' },
});

const TextInputCard = ({ dispatch }) => {
  const [text, setText] = useState('');
  const inputSchema = yup.string().required().min(2);
  const submitHandler = () => {
    inputSchema.isValid(text).then((valid) => {
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
    });
  };

  return (
    <Card elevation={3} style={styles.card}>
      <Card.Content>
        <TextInput
          placeholder='Enter new product'
          value={text}
          onChangeText={(txt) => {
            setText(txt);
          }}
          blurOnSubmit={false}
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
