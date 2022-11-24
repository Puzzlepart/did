/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import createReducer from '.'
import { ICustomersUrlParameters } from '../types'
import { initState } from './initState'

/**
 * Customers reducer hook
 */
export function useCustomersReducer() {
  const parameters = useParams<ICustomersUrlParameters>()
  const reducer = useMemo(() => createReducer({ params: parameters }), [])
  const [state, dispatch] = useReducer(reducer, initState(parameters))
  return { state, dispatch } as const
}
