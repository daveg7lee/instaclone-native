import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../routes';
import { RouteProps } from '../types';

const LogIn = ({ navigation }: RouteProps) => {
  return (
    <View>
      <Text>Log In</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.createAccount)}
      >
        <View>
          <Text>Go to Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;
