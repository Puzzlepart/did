import { useMemo, useReducer } from 'react'
import createReducer, { initState } from './'
import { IProjectsReducerParams } from './types'

/**
 * Use Projects reducer
 *
 * @param params - Params
 */
export function useProjectsReducer(params: IProjectsReducerParams) {
  const reducer = useMemo(() => createReducer(params), [params])
  const [state, dispatch] = useReducer(reducer, initState(params.url))
  return { state, dispatch }
}
