import { ApolloQueryResult, WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import { DateRangeType } from '@fluentui/react'
import { AnyAction } from '@reduxjs/toolkit'
import { useAppContext } from 'AppContext'
import { Dispatch, useEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { ITimesheetState } from '../types/ITimesheetState'
import $timesheet from './timesheet.gql'

/**
 * Use Timesheet query
 *
 * @param state - State
 * @param dispatch - Dispatch
 * @param fetchPolicy - Fetch policy (default: 'cache-and-network')
 *
 * @category Timesheet Hooks
 */
export function useTimesheetQuery(
  state: ITimesheetState,
  dispatch: Dispatch<AnyAction>,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-and-network'
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
    fetchPolicy,
    errorPolicy: 'all'
  })

  useEffect(() => dispatch(DATA_UPDATED(query)), [query])

  return query.refetch
}
