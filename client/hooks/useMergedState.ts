/* eslint-disable unicorn/prevent-abbreviations */
import { SetStateAction, useState } from 'react'

/**
 * Custom hook that provides a merged state and a function to update the state.
 * This allows for updating just parts of the state without losing the rest of the state.
 *
 * @template T - The type of the state.
 * @param initialState - The initial state value
 * .
 * @returns An object containing the current state and a function to update the state.
 */
export function useMergedState<T>(initialState: T) {
  const [state, $setState] = useState(initialState)

  const setState = (newState: SetStateAction<Partial<T>>) => {
    if (typeof newState === 'function') {
      $setState((prevState) => ({
        ...prevState,
        ...(newState as (newState: T) => T)(prevState)
      }))
    } else {
      $setState({
        ...state,
        ...newState
      })
    }
  }

  return { state, setState }
}
