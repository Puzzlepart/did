/* eslint-disable unicorn/prevent-abbreviations */
import { useLazyQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
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
  const isQueryCalled = useBoolean(false)
  const [executeQuery, { data, loading }] = useLazyQuery(report_custom, {
    fetchPolicy: 'no-cache'
  })

  const executeReport = () => {
    isQueryCalled.setTrue()
    onCollapse()
    executeQuery({
      variables: {
        query
      },
      onCompleted: (data) => {
        context.displayToast(
          t('reports.customQuerySuccessText', { count: _.get(data, 'timeEntries', []).length }),
          'success',
          10,
          {
            headerText: t('reports.customQuerySuccessHeader')
          }
        )
      }
    })
  }

  return {
    executeReport,
    loading,
    items: _.get(mapTimeEntries(data), 'timeEntries', []),
    isQueryCalled: isQueryCalled.value
  }
}
