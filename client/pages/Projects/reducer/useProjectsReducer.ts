import { useMemo, useReducer } from 'react'
import createReducer, { initState } from '.'
import { IProjectsUrlParameters } from '../types'

/**
 * Use Projects reducer
 *
 * @param urlParameters - URL parameters
 */
export function useProjectsReducer(urlParameters: IProjectsUrlParameters) {
  const reducer = useMemo(() => createReducer(urlParameters), [urlParameters])
  const [state, dispatch] = useReducer(reducer, initState(urlParameters))
  return { state, dispatch }
}
