/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { default_query_preset } from './query-presets'

/**
 * Query hook for UserExportHours
 *
 * @param queryPreset - Query preset
 *
 * @category UserExportHours Hooks
 */
export function useUserReportQuery(queryPreset: any) {
  const { data, loading } = useQuery(
    queryPreset?.query || default_query_preset,
    {
      skip: !queryPreset?.query,
      fetchPolicy: 'cache-first'
    }
  )
  return { timeentries: data?.userReport || [], loading }
}
