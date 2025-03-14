// client/graphql/index.ts
/**
 * GraphQL
 *
 * @module GraphQL
 *
 * @see https://graphql.org/
 */

import { ApolloClient, ApolloLink } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import apolloLink from './apolloLink'
import httpLink from './httpLink'

/**
 * @category GraphQL
 */
export interface IError {
  name: string
  message: string
  code: string
  statusCode: string
}

/**
 * @category GraphQL
 */
export interface IBaseResult {
  success: boolean
  error: IError
  data: string
}

/**
 * Defines our [Apollo Client](https://www.apollographql.com/docs/react/)
 *
 * * Using `InMemoryCache`
 * * Using url `/graphql`
 * * Using `cache-and-network` as default `fetchPolicy`
 */
export const client = new ApolloClient({
  link: ApolloLink.from([apolloLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Role: {
        // Use `name` as the key field for `Role` objects since they don't have an `ID`
        keyFields: ['name']
      },
      User: {
        fields: {
          // Custom merge function for `User.role` field to ensure proper merging
          role: {
            merge(existing, incoming) {
              // If existing has more fields, keep that one
              return incoming && Object.keys(incoming).length > 1
                ? incoming
                : { ...existing, ...incoming }
            }
          }
        }
      }
    }
  }),
  uri: `${document.location.origin}/graphql`,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } }
})

/**
 * @ignore
 */
export { FetchPolicy } from '@apollo/client'
