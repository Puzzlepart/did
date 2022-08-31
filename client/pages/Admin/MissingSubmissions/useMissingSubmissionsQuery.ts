import { useQuery } from '@apollo/client'
import { useTimesheetPeriods } from 'hooks'
import { TimesheetPeriodObject, User } from 'types'
import $missingSubmissions from './missing-submissions.gql'

export function useMissingSubmissionsQuery() {
  const { queries } = useTimesheetPeriods()
  const query = useQuery($missingSubmissions, {
    fetchPolicy: 'cache-and-network',
    variables: { queries }
  })
  return {
    periods: (query.data?.periods ?? []) as TimesheetPeriodObject[],
    users: (query.data?.users ?? []) as User[]
  } as const
}
