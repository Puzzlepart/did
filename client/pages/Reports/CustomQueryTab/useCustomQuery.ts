/* eslint-disable unicorn/prevent-abbreviations */
import { ApolloError, useLazyQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import $date, { DurationStringFormat } from 'DateUtils'
import _ from 'lodash'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { removeNullishValues } from 'utils'
import { ReportsQuery } from '../../../types'
import { report_custom } from '../queries'
import { mapTimeEntries } from '../reducer'

/**
 * Custom hook that returns a function to parse Apollo errors and translate them into user-friendly error messages.
 *
 * @returns A function that takes an ApolloError and returns a translated Error object.
 *
 * The returned function:
 * - Translates the generic Apollo error name and message using the `useTranslation` hook.
 * - Checks if the error message is 'Maximum call stack size exceeded' and translates it accordingly.
 * - Creates and returns a new Error object with the translated name and message.
 *
 * @example
 * const parseError = useApolloErrorParser();
 * const error = parseError(apolloError);
 * console.error(error.name, error.message);
 */
function useApolloErrorParser() {
  const { t } = useTranslation()
  return (e: ApolloError) => {
    if(!e) return null
    let name = t('apollo.genericErrorName')
    let message = t('apollo.genericErrorMesssage')
    if (e.message === 'Maximum call stack size exceeded') {
      name = t('apollo.maximumCallStackSizeExceededName')
      message = t('apollo.maximumCallStackSizeExceededMessage')
    }
    const error = new Error(message)
    error.name = name
    return error
  }
}

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
  const [executeQuery, { data, loading, error }] = useLazyQuery(report_custom, {
    fetchPolicy: 'cache-first'
  })
  const parseApolloError = useApolloErrorParser()

  const onQueryCompleted = useCallback(
    (data) => {
      const hours =
        (Date.now() - queryBeginRef.current.getTime()) / 1000 / 60 / 60
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
    },
    [queryBeginRef?.current]
  )

  /**
   * Executes the report query.
   *
   * This function sets the current date and time to `queryBeginRef`, collapses the UI,
   * and then executes the query with the provided variables. Once the query is completed,
   * it triggers the `onQueryCompleted` callback.
   */
  const onExecuteReport = useCallback(() => {
    queryBeginRef.current = new Date()
    onCollapse()
    executeQuery({
      variables: {
        query: removeNullishValues(query)
      },
      onCompleted: onQueryCompleted
    })
  }, [query])

  return {
    onExecuteReport,
    loading,
    items: _.get(mapTimeEntries({ ...data }), 'timeEntries', []),
    queryBegin: queryBeginRef,
    error: parseApolloError(error)
  }
}
