import React from 'react';
import { Text } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';

function Upload({
  route: {
    params: { file },
  },
}) {
  return (
    <ScreenLayout>
      <Text style={{ color: 'white' }}>Upload</Text>
    </ScreenLayout>
  );
}

export default Upload;
