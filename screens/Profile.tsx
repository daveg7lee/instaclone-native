import React from 'react';
import { Text } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

export default function Profile({ route: { params } }) {
  return (
    <ScreenLayout>
      <Text style={{ color: 'white' }}>
        Hello it's {params?.username}'s Profile!
      </Text>
    </ScreenLayout>
  );
}
