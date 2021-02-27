/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useReducer } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ICustomersParams } from '../types'
import createReducer, { initState } from './'

export function useCustomersReducer() {
  const history = useHistory()
  const params = useParams<ICustomersParams>()
  const reducer = useMemo(() => createReducer({ params, history }), [])
  const [state, dispatch] = useReducer(reducer, initState(params))
  return { state, dispatch }
}
