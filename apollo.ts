import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://118.45.234.113:4000',
  cache: new InMemoryCache(),
});

export default client;
