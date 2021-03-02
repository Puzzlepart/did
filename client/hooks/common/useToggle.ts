/* eslint-disable tsdoc/syntax */
import { useReducer } from 'react'

/**
 * Returns the tuple [state, dispatch]
 * Normally with useReducer you pass a value to dispatch to indicate what action to
 * take on the state, but in this case there's only one action.
 *
 * @category React Hook
 */
export function useToggle(initialValue = false) {
  return useReducer((state) => !state, initialValue)
}
