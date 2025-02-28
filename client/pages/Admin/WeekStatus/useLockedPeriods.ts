import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { LockedPeriod, Subscription } from 'types'
import lockedPeriodsQuery from './locked-periods.gql'

/**
 * Hook for managing locked periods.
 */
export function useLockedPeriods() {
  const [lockedPeriods, setLockedPeriods] = useState<LockedPeriod[]>([])
  const { data, loading } = useQuery<{ subscription: Subscription }>(
    lockedPeriodsQuery,
    {
      fetchPolicy: 'network-only'
    }
  )

  useEffect(() => {
    setLockedPeriods(data?.subscription?.lockedPeriods ?? [])
  }, [loading])

  return {
    value: lockedPeriods,
    add: (periodId: string, reason?: string) =>
      setLockedPeriods([
        ...lockedPeriods,
        { periodId, reason, lockedAt: new Date() }
      ]),
    remove: (periodId: string) =>
      setLockedPeriods(
        lockedPeriods.filter(({ periodId: id }) => id !== periodId)
      ),
    isLocked: (periodId: string) =>
      lockedPeriods.some(({ periodId: id }) => id === periodId)
  }
}
