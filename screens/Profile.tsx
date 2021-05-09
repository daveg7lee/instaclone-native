import React, { useEffect } from 'react';
import { Text } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

export default function Profile({ route: { params }, navigation }) {
  console.log(params);
  useEffect(() => {
    navigation.setOptions({
      title: params?.username,
    });
  }, [params?.username]);
  return (
    <ScreenLayout>
      <Text style={{ color: 'white' }}>
        Hello it's {params?.username}'s Profile!
      </Text>
    </ScreenLayout>
  );
}
