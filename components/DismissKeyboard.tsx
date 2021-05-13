import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
  background-color: black;
`;

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <Container onPress={dismissKeyboard} disabled={Platform.OS === 'web'}>
      {children}
    </Container>
  );
}
