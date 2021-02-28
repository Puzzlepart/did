/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ICustomersParams as ICustomersParameters } from '../types'
import createReducer, { initState } from './'

export function useCustomersReducer() {
  const history = useHistory()
  const parameters = useParams<ICustomersParameters>()
  const reducer = useMemo(() => createReducer({ params: parameters, history }), [])
  const [state, dispatch] = useReducer(reducer, initState(parameters))
  return { state, dispatch }
}
