import { ApolloClient, FetchPolicy, WatchQueryFetchPolicy } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

/**
 * @ignore
 */
export interface IError {
  name: string;
  message: string;
  code: string;
  statusCode: string;
}

/**
 * @ignore
 */
export interface IBaseResult {
  success: boolean;
  error: IError;
  data: string;
}

/**
 * Get GraphQL client
 * 
 * @param {string} uri Base URI
 * @param {WatchQueryFetchPolicy} fetchPolicy Fetch policy
 */
export const getClient = (uri: string = `${document.location.origin}/graphql`, fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network') => new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri }),
  defaultOptions: { watchQuery: { fetchPolicy } },
});

export { FetchPolicy }