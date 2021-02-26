import { useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { AppContext } from 'AppContext'
import { Dispatch, useContext, useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { ITimesheetState } from '../types'
import $timesheet from './timesheet.gql'

/**
 * Use Timesheet query
 *
 * @param {ITimesheetState} state State
 * @param {Dispatch<AnyAction>} dispatch Dispatch
 */
export function useTimesheetQuery(state: ITimesheetState, dispatch: Dispatch<AnyAction>) {
  const { user } = useContext(AppContext)
  const query = useQuery($timesheet, {
    skip: !state.scope.query(),
    variables: {
      query: state.scope.query(),
      options: {
        dateFormat: 'dddd DD',
        locale: user.language,
        tzOffset: new Date().getTimezoneOffset()
      }
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  })

  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  return { refetch: query.refetch }
}
