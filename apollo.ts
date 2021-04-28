import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'TOKEN';

export const isLoggedInVar = makeVar(false);

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, JSON.stringify(token));
  isLoggedInVar(true);
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

export default client;
