import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

function Seperator() {
  return <Container />;
}

export default Seperator;
