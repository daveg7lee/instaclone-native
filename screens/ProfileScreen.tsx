import React, { useEffect } from 'react';
import Profile from '../components/Profile';
import ScreenLayout from '../components/ScreenLayout';

export default function ProfileScreen({ route: { params }, navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: params?.username,
    });
  }, [params?.username]);
  return (
    <ScreenLayout>
      <Profile {...params} />
    </ScreenLayout>
  );
}
