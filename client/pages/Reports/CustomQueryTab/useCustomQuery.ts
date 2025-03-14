/* eslint-disable unicorn/prevent-abbreviations */
import { useLazyQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import $date, { DurationStringFormat } from 'DateUtils'
import _ from 'lodash'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsQuery } from '../../../types'
import { report_custom } from '../queries'
import { mapTimeEntries } from '../reducer'

/**
 * Custom query hook for `CustomQueryTab` that handles the query execution.
 *
 * @param query Query object
 * @param onCollapse On collapse callback
 */
export function useCustomQuery(query: ReportsQuery, onCollapse: () => void) {
  const { t } = useTranslation()
  const context = useAppContext()
  const queryBeginRef = useRef<Date>(null)
  const [executeQuery, { data, loading }] = useLazyQuery(report_custom, {
    fetchPolicy: 'cache-and-network'
  })

  const onQueryCompleted = useCallback((data) => {
    const hours = ((Date.now() - queryBeginRef.current.getTime()) / 1000 / 60 / 60)
    const duration = $date.getDurationString(hours, t, {
      seconds: true,
      format: DurationStringFormat.Long
    })
    const count = _.get(data, 'timeEntries', []).length
    context.displayToast(
      t('reports.customQuerySuccessText', { count }),
      'success',
      8,
      {
        headerText: t('reports.customQuerySuccessHeader', {
          duration
        })
      }
    )
  }, [queryBeginRef?.current])

  /**
   * Executes the report query.
   * 
   * This function sets the current date and time to `queryBeginRef`, collapses the UI, 
   * and then executes the query with the provided variables. Once the query is completed, 
   * it triggers the `onQueryCompleted` callback.
   */
  const executeReport = useCallback(() => {
    queryBeginRef.current = new Date()
    onCollapse()
    executeQuery({
      variables: {
        query
      },
      onCompleted: onQueryCompleted
    })
  }, [query])

  return {
    executeReport,
    loading,
    items: _.get(mapTimeEntries({ ...data }), 'timeEntries', []),
    isQueryCalled: Boolean(queryBeginRef.current)
  }
}
