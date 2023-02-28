import { useState } from 'react'

/**
 * Hook for using a `Map` as a state object. A set of
 * functions are returned for setting the map, setting
 * a key on the map, getting the value of a key, getting
 * an object representation of the map and clearing the
 * map.
 *
 * @param map - Intitial map
 *
 * @returns a `$set` function to set the map, a `set´
 * function to set a key on the map, a `value`function
 * to return the value of the specified key, a `$` object
 * that is a object representation of the map and a `reset`
 * function for clearing the map.
 *
 * @category React Hook
 */
export function useMap<
  KeyType = string,
  ObjectType = Record<any, any>,
  ValueType = any
>(map = new Map()) {
  const [$map, $set] = useState<Map<KeyType, ValueType>>(map)
  const reset = () => $set(new Map())

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
  const set = (key: KeyType, value: ValueType) => {
    $set((_state) => new Map(_state).set(key, value))
  }

  /**
   * Get model value. The value is retrived
   * from the converted object
   *
   * @param key - Key of the value to retriee
   * @param _defaultValue - Default value
   *
   * @returns Model value from the converted object
   */
  function value<T = any>(key: KeyType, _defaultValue: T = null): T {
    return ($ as any)[key] ?? _defaultValue
  }

  return {
    $set,
    $,
    set,
    value,
    reset
  } as const
}
