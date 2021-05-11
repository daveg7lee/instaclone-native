import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { colors } from '../colors';

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  margin-right: 12px;
  font-size: 16px;
  font-weight: 600;
`;

export default ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <HeaderRightText>{text}</HeaderRightText>
  </TouchableOpacity>
);
