import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

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
    <Container>
      {loading ? <ActivityIndicator color="white" /> : children}
    </Container>
  );
}

export default ScreenLayout;
