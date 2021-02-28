/* eslint-disable tsdoc/syntax */
import { useState } from 'react'
import { isArray } from 'underscore'

/**
 * Browser storage hook
 *
 * @category React Hook
 */
export function useBrowserStorage<T = any>({
  key,
  initialValue,
  store = window.localStorage
}): [T, (value: any) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = store.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  /**
   * Append to array
   *
   * @param value - Value to append to the array
   */
  const append = (value: any) => {
    if (!isArray(storedValue)) return
    try {
      const valueToStore = ([...storedValue, value] as unknown) as T
      setStoredValue(valueToStore)
      store.setItem(key, JSON.stringify(valueToStore))
    } catch {}
  }

  /**
   * Clear value
   */
  const clear = () => {
    try {
      setStoredValue(initialValue)
      store.setItem(key, initialValue)
    } catch {}
  }

  return [storedValue, append, clear]
}
