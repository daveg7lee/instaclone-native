import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../routes';
import { RouteProps } from '../types';

const Welcome = ({ navigation }: RouteProps) => {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate(routes.logIn)}>
        <View>
          <Text>Log In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.createAccount)}
      >
        <View>
          <Text>Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
