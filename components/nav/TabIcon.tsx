import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabIconProps {
  name: any;
  color: string;
  focused: boolean;
  size?: number;
}

function TabIcon({ name, color, focused, size }: TabIconProps) {
  return (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      color={color}
      size={size ? size : 22}
    />
  );
}

export default TabIcon;
