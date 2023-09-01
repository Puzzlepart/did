import { useMemo, useReducer } from 'react'
import createReducer, { initialState } from '.'

/**
 * Use Users reducer
 */
export function useUsersReducer() {
  const reducer = useMemo(() => createReducer(), [])
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch } as const
}
