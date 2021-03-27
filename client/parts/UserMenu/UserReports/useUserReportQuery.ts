/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { unique } from 'underscore'
import { getSum } from 'utils/getSum'
import { default_query } from './queries'

/**
 * Query hook for UserReports
 *
 * @param preset - Query preset
 *
 * @category UserReports Hooks
 */
export function useUserReportQuery({ preset }) {
  const { data, loading } = useQuery(preset?.query || default_query, {
    skip: !preset?.query,
    fetchPolicy: 'cache-first'
  })
  const data_ = data?.userReport || []
  return useMemo(
    () => ({
      data: data_,
      loading,
      preset: (preset?.text || '').toLowerCase(),
      hours: getSum(data_, 'duration'),
      projects: unique(data_, (t) => t.project?.name).length
    }),
    [data_]
  )
}
