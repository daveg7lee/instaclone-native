import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

export default function DismissKeyboard({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={dismissKeyboard}
      disabled={Platform.OS === 'web'}
      style={{ flex: 1 }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
}
