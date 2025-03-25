import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useMemo } from 'react'
import { Customer } from 'types'
import $customerProjects from './customerProjects.gql'

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
  const query = useQuery($customerProjects, {
    variables: {
      customerKey: customer?.key
    },
    skip: !customer,
    fetchPolicy
  })
  const projects = useMemo(() => query?.data?.projects ?? [], [query])
  return [projects, query] as const
}
