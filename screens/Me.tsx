import React, { useEffect } from 'react';
import { Text } from 'react-native';
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
      <Text style={{ color: 'white' }}>{me?.username}</Text>
    </ScreenLayout>
  );
}
