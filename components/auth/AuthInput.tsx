import React from 'react';
import styled from 'styled-components/native';

const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 13px 7px;
  border-radius: 4px;
  color: white;
  margin-bottom: ${(props) => (props.lastOne ? '15' : 8)}px;
`;

function AuthInput(props) {
  return <TextInput placeholderTextColor="gray" {...props} />;
}

export default AuthInput;