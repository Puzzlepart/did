/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import createReducer from '.'
import { ICustomersUrlParameters } from '../types'
import createInitialState from './initState'

/**
 * Use Projects reducer
 *
 * @param urlParameters - URL parameters
 */
export function useCustomersReducer(urlParameters: ICustomersUrlParameters) {
  const reducer = useMemo(() => createReducer(urlParameters), [])
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(urlParameters)
  )
  return { state, dispatch } as const
}
