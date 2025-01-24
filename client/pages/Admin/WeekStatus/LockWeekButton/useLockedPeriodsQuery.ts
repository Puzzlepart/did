import { useQuery } from '@apollo/client'
import { Subscription } from 'types'
import lockedPeriodsQuery from './locked-periods.gql'

/**
 * Hook for fetching locked periods.
 */
export function useLockedPeriodsQuery() {
  const { data, loading } = useQuery<{ subscription: Subscription }>(
    lockedPeriodsQuery,
    {
      fetchPolicy: 'network-only'
    }
  )
  return [data?.subscription?.lockedPeriods, loading] as const
}
