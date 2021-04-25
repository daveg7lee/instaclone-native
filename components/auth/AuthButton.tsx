import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';

interface AuthButtonProps {
  onPress: Function;
  disabled: boolean;
  text: string;
}

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 13px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({
  onPress,
  disabled,
  text,
}: AuthButtonProps) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
