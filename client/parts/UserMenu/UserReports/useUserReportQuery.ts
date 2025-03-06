import { WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { TimeEntry } from 'types'
import _ from 'underscore'
import { getSum } from 'utils/getSum'
import { default_query } from './queries'
import { useTranslation } from 'react-i18next'
import { FieldProps, ProgressBarProps } from '@fluentui/react-components'

type UserReportQueryResult = {
  userReport: TimeEntry[]
}

type UserReportTransformedQueryResult = {
  data: TimeEntry[]
  loading: boolean
  preset: string
  hours: string
  projects: number
  autoMatchScore: {
    value: ProgressBarProps['value']
    validationMessage: FieldProps['validationMessage']
    validationState: FieldProps['validationState']
  }
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
): UserReportTransformedQueryResult {
  const { t } = useTranslation()
  const query = useQuery<UserReportQueryResult>(
    preset?.query || default_query,
    {
      skip: !preset?.query,
      fetchPolicy
    }
  )
  const data = query?.data?.userReport ?? []
  return useMemo<UserReportTransformedQueryResult>(
    () => {
      const autoMatchScore = Number.parseFloat((_.filter(data, (t) => t.manualMatch !== true).length / data.length).toFixed(2))
      return {
        data,
        loading: query.loading,
        preset: (preset?.text || '').toLowerCase(),
        hours: getSum(data, 'duration').toFixed(0),
        projects: _.unique(data, (t) => t.project?.name).length,
        autoMatchScore: {
          value: autoMatchScore,
          validationMessage: autoMatchScore < 0.7
            ? t('common.autoMatchError')
            : (autoMatchScore < 0.85
              ? t('common.autoMatchWarning')
              : (autoMatchScore >= 0.95
                && t('common.autoMatchSuccess'))),
          validationState: (autoMatchScore < 0.7 ? 'error' : (autoMatchScore < 0.85 ? 'warning' : 'success'))
        }
      }
    },
    [data]
  )
}
