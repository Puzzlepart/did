import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useTimesheetPeriods } from 'hooks'
import { TimesheetPeriodObject, User } from 'types'
import $weekStatus from './week-status.gql'

export function useWeekStatusQuery(
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const { queries } = useTimesheetPeriods()
  const { data } = useQuery<{
    periods: TimesheetPeriodObject[]
    users: User[]
  }>($weekStatus, {
    fetchPolicy,
    variables: { queries }
  })
  const periods = data?.periods ?? []
  const users = data?.users ?? []
  return [periods, users] as const
}
