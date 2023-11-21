// apollo-client.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  // uri: 'http://127.0.0.1:8000/subgraphs/name/equbv5',
  // uri: 'https://api.studio.thegraph.com/query/47164/equbfacotry/version/latest',
  // uri: 'https://api.studio.thegraph.com/query/47164/equbfacotry/v0.0.6',
  uri: 'http://127.0.0.1:8000/subgraphs/name/equb',
  cache: new InMemoryCache(),
}); 