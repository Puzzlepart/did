import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import { useTimesheetPeriods } from 'hooks'
import { TimesheetPeriodObject, User } from 'types'
import $missingSubmissions from './missing-submissions.gql'

export function useMissingSubmissionsQuery(
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const { queries } = useTimesheetPeriods()
  const { data } = useQuery<{
    periods: TimesheetPeriodObject[]
    users: User[]
  }>($missingSubmissions, {
    fetchPolicy,
    variables: { queries }
  })
  const periods = data?.periods ?? []
  const users = data?.users ?? []
  return [periods, users] as const
}
