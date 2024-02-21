import { WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { TimeEntry } from 'types'
import _ from 'underscore'
import { getSum } from 'utils/getSum'
import { default_query } from './queries'

type UserReportQueryResult = {
  userReport: TimeEntry[]
}

/**
 * Query hook for UserReports
 *
 * @param preset - Query preset
 * @param fetchPolicy - Fetch policy that defaults to `cache-first`
 *
 * @category UserReports Hooks
 */
export function useUserReportQuery(
  preset: any,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const query = useQuery<UserReportQueryResult>(
    preset?.query || default_query,
    {
      skip: !preset?.query,
      fetchPolicy
    }
  )
  const data = query?.data?.userReport ?? []
  return useMemo(
    () => ({
      data,
      loading: query.loading,
      preset: (preset?.text || '').toLowerCase(),
      hours: getSum(data, 'duration').toFixed(0),
      projects: _.unique(data, (t) => t.project?.name).length
    }),
    [data]
  )
}
