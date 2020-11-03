import { ApolloClient, FetchPolicy } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'

export interface IError {
  name: string
  message: string
  code: string
  statusCode: string
}

export interface IBaseResult {
  success: boolean
  error: IError
  data: string
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${document.location.origin}/graphql`,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export { GET_CURRENT_USER } from './GET_CURRENT_USER'
export { FetchPolicy }
