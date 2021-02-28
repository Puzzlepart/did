import { useMemo, useReducer } from 'react'
import createReducer, { initState } from './'
import { IProjectsReducerParameters } from './types'

/**
 * Use Projects reducer
 *
 * @param params - Params
 */
export function useProjectsReducer(parameters: IProjectsReducerParameters) {
  const reducer = useMemo(() => createReducer(parameters), [parameters])
  const [state, dispatch] = useReducer(reducer, initState(parameters.url))
  return { state, dispatch }
}
