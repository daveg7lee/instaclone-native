import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.KeyboardAvoidingView`
  background-color: black;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function KeyboardAvoiding({ children }) {
  return (
    <Container
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      {children}
    </Container>
  );
}

export default KeyboardAvoiding;
