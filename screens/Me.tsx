import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Profile from '../components/Profile';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { RouteProps, UserType } from '../types';

interface DataType {
  me: UserType;
}

export default function Me({ navigation }: RouteProps) {
  const { me }: DataType = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: me?.username,
    });
  }, [me?.username]);
  return (
    <ScreenLayout>
      <Profile {...me} />
    </ScreenLayout>
  );
}
