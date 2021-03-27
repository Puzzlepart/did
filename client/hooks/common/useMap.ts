/* eslint-disable tsdoc/syntax */
import { useState } from 'react'

/**
 * Use `Map` state
 * 
 * @param map - Intitial map
 * 
 * @category React Hook
 */
export function useMap<K = any, V = any>(map = new Map()) {
  const [state, setState] = useState<Map<K, V>>(map)
  const reset = () => setState(new Map())

  /**
   * Object representation of the `Map`
   */
  const $: Record<any, V> = [...state].reduce((object, [key, value]) => {
    object[key] = value
    return object
  }, {} as any)



  /**
   * Set `key` of `model`
   * 
   * @param key - Key
   * @param value - Value
   */
   const set = (key: K, value: V) => {
    setState((_state) => new Map(_state).set(key, value))
  }

  /**
   * Get model value. The value is retrived
   * from the converted object
   * 
   * @param key - Key of the value to retriee
   * @returns 
   */
  const value = (key: K) => $[key]

  return {
    $,
    set,
    value,
    reset
  }
}
