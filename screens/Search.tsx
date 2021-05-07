import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../routes';
import { RouteProps } from '../types';

export default function Search({ navigation }: RouteProps) {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(routes.photo)}>
        <Text style={{ color: 'white' }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
