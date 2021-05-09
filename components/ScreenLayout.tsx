import React from 'react';
import { ActivityIndicator, Keyboard, View } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from './DismissKeyboard';

interface ScreenLayoutProps {
  loading?: boolean;
  children: any;
}

const Container = styled.View`
  background-color: black;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function ScreenLayout({ loading, children }: ScreenLayoutProps) {
  return (
    <DismissKeyboard>
      <Container>
        {loading ? <ActivityIndicator color="white" /> : children}
      </Container>
    </DismissKeyboard>
  );
}

export default ScreenLayout;
