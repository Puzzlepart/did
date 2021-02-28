/* eslint-disable tsdoc/syntax */
// client/graphql/index.ts
/**
 * GraphQL
 *
 * @module GraphQL
 *
 * @see https://graphql.org/
 */

import { ApolloClient, FetchPolicy } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'

/**
 * @ignore
 */
export interface IError {
  name: string
  message: string
  code: string
  statusCode: string
}

/**
 * @ignore
 */
export interface IBaseResult {
  success: boolean
  error: IError
  data: string
}

/**
 * Initializing our Apollo Client
 *
 * * Using InMemoryCache
 * * Using url /graphql
 * * Using cache-and-network as default fetchPolicy
 */
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${document.location.origin}/graphql`,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } }
})

export { default as $context } from './context.gql'
/**
 * @ignore
 */
export { FetchPolicy }
