import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/47164/equbfacotry/v0.0.27',
  // uri: 'http://127.0.0.1:8000/subgraphs/name/equbv50',
  cache: new InMemoryCache(),
});