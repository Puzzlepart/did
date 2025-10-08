import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useMemo } from 'react'
import { Customer } from 'types'
import $partnerProjects from './partnerProjects.gql'

/**
 * Handles fetching projects where the selected customer is a partner.
 *
 * @param customer - Selected customer
 * @param fetchPolicy - Fetch policy (default: `cache-and-network`)
 */
export function usePartnerProjectsQuery(
  customer: Customer,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
) {
  const query = useQuery($partnerProjects, {
    variables: {
      customerKey: customer?.key
    },
    skip: !customer,
    fetchPolicy
  })
  const partnerProjects = useMemo(
    () => query?.data?.partnerProjects ?? [],
    [query]
  )
  return [partnerProjects, query] as const
}
