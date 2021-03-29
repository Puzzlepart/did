/* eslint-disable tsdoc/syntax */
import { useState } from 'react'
import _ from 'underscore'

/**
 * Returns the current `state` of the array, a function
 * to push a new item to the array, and a function to
 * check if the array contains the specified item
 *
 * @category React Hook
 */
export function useArray<T>(initialValue: T[] = []) {
  const [state, setState] = useState(initialValue)
  return [
    state,
    (item: T) => setState((_) => [..._, item]),
    (item: T) => _.contains(state, item)
  ] as const
}
