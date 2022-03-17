/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import createReducer, { initState } from '.'
import { ICustomersParameters } from '../types'

/**
 * Use Projects reducer
 */
export function useCustomersReducer() {
  const parameters = useParams<ICustomersParameters>()
  const reducer = useMemo(
    () => createReducer({ params: parameters }),
    []
  )
  const [state, dispatch] = useReducer(reducer, initState(parameters))
  return { state, dispatch }
}
