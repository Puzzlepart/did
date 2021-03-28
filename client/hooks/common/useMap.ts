/* eslint-disable tsdoc/syntax */
import { useState } from 'react'

/**
 * Use `Map` state
 *
 * @param map - Intitial map
 *
 * @category React Hook
 */
export function useMap<KeyType = string, ObjectType = Record<any, any>>(
  map = new Map()
) {
  const [$map, $set] = useState<Map<KeyType, ObjectType>>(map)
  const reset = () => $set(new Map<KeyType, ObjectType>())

  /**
   * Object representation of the `Map`
   *
   * The `Map` is converted to an object using
   * `[...$map].reduce`
   */
  const $: ObjectType = [...$map].reduce((object, [key, value]) => {
    object[key] = value
    return object
  }, {} as any)

  /**
   * Set `key` of `model`
   *
   * @param key - Key
   * @param value - Value
   */
  const set = (key: KeyType, value: any) => {
    $set((_state) => new Map(_state).set(key, value))
  }

  /**
   * Get model value. The value is retrived
   * from the converted object
   *
   * @param key - Key of the value to retriee
   * @param _default - Default value
   *
   * @returns
   */
  const value = (key: KeyType, _default = null): any =>
    ($ as any)[key] || _default

  return {
    $set,
    $,
    set,
    value,
    reset
  }
}
