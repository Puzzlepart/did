import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useMemo } from 'react'
import { Customer } from 'types'
import $projects from './projects.gql'

/**
 * Handles fetching projects for the selected customer.
 *
 * @param customer - Selected customer
 * @param fetchPolicy - Fetch policy (default: `cache-and-network`)
 */
export function useProjectsQuery(
  customer: Customer,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
) {
  const query = useQuery($projects, {
    variables: {
      customerKey: customer?.key
    },
    skip: !customer,
    fetchPolicy
  })
  const projects = useMemo(() => query?.data?.projects ?? [], [query])
  return [projects, query] as const
}
