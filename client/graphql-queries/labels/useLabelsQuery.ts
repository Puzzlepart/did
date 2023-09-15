import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useMemo } from 'react'
import { LabelObject } from 'types'
import _ from 'underscore'
import $labelsQuery from './labels.gql'

/**
 * A custom hook that fetches a list of labels using the `labelsQuery` GraphQL query.
 *
 * @param fetchPolicy The fetch policy to use for the query. Defaults to 'cache-first'.
 *
 * @returns An array containing the list of labels and the `useQuery` result object with the `data` property omitted.
 */
export function useLabelsQuery(
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const query = useQuery<{ labels: LabelObject[] }>($labelsQuery, {
    fetchPolicy
  })
  const labels = useMemo(() => query.data?.labels ?? [], [query.data])
  return [labels, _.omit(query, 'data')] as const
}
