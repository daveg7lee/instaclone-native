import React from 'react';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import KeyboardAvoiding from '../components/KeyboardAvoiding';

const Input = styled.TextInput`
  background-color: white;
  width: 100%;
`;

function Comments() {
  return (
    <KeyboardAvoiding>
      <DismissKeyboard>
        <Input placeholder="Add a comment..." />
      </DismissKeyboard>
    </KeyboardAvoiding>
  );
}

export default Comments;
