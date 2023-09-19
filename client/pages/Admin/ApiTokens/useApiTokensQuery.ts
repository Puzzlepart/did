import { useQuery } from '@apollo/client'
import { ApiToken } from 'types'
import $tokens from './tokens.gql'

export function useApiTokensQuery() {
  const query = useQuery<{ tokens: ApiToken[] }>($tokens)
  const tokens = query.data?.tokens ?? []
  return [tokens, query] as const
}
