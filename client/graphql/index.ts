import { ApolloClient, FetchPolicy } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${document.location.origin}/graphql` }),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

export { FetchPolicy }