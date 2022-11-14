import { ApolloQueryResult, useQuery } from '@apollo/client'
import { DateRangeType } from '@fluentui/react'
import { AnyAction } from '@reduxjs/toolkit'
import { useAppContext } from 'AppContext'
import { Dispatch, useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { ITimesheetState } from '../types'
import $timesheet from './timesheet.gql'

/**
 * Use Timesheet query
 *
 * @param state - State
 * @param dispatch - Dispatch
 *
 * @category Timesheet Hooks
 */
export function useTimesheetQuery(
  state: ITimesheetState,
  dispatch: Dispatch<AnyAction>
): () => Promise<ApolloQueryResult<any>> {
  const { user } = useAppContext()
  const query = useQuery($timesheet, {
    skip: !state.dateRange.query(),
    variables: {
      query: state.dateRange.query(),
      options: {
        dateFormat: 'dddd DD',
        locale: user.preferredLanguage,
        tzOffset: new Date().getTimezoneOffset(),
        includeSplitWeeks: state.dateRangeType === DateRangeType.Week
      }
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  return query.refetch
}
