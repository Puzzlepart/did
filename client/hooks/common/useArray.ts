/* eslint-disable tsdoc/syntax */
import { useState } from 'react'
import { contains } from 'underscore'

/**
 * Returns the current state of the array, a function
 * to push a new item to the array, and a function to
 * check if the array contains the specified item
 *
 * @category React Hook
 */
export function useArray<T>(
  initialValue: T[] = []
): [T[], (item: T) => void, (item: T) => boolean] {
  const [state, setState] = useState(initialValue)
  return [
    state,
    (item: T) => setState((_) => [..._, item]),
    (item: T) => contains(state, item)
  ]
}
