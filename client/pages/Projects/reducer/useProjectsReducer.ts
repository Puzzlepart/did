import { useMemo, useReducer } from 'react'
import createReducer from '.'
import { IProjectsUrlParameters } from '../types'
import createInitialState from './initState'

/**
 * Use Projects reducer
 *
 * @param urlParameters - URL parameters
 */
export function useProjectsReducer(urlParameters: IProjectsUrlParameters) {
  const reducer = useMemo(() => createReducer(urlParameters), [urlParameters])
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(urlParameters)
  )
  return { state, dispatch } as const
}
