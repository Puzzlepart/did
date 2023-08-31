import { useState } from 'react'
import s from 'underscore.string'

/**
 * Hook for using a `Map` as a state object. A set of
 * functions are returned for setting the map, setting
 * a key on the map, getting the value of a key, getting
 * an object representation of the map and clearing the
 * map.
 *
 * @param initialMap - Intitial map
 *
 * @returns A `TypedMap` with a `$set` function to set the map, a `set´
 * function to set a key on the map, a `value`function
 * to return the value of the specified key, a `$` object
 * that is a object representation of the map and a `reset`
 * function for clearing the map. Also a `isSet` function
 * to check if all the specified keys have a non-blank value.
 *
 * @category React Hook
 */
export function useMap<
  KeyType = string,
  ObjectType = Record<any, any>,
  ValueType = any
>(initialMap = new Map()): TypedMap<KeyType, ObjectType, ValueType> {
  const [$map, $set] = useState<Map<KeyType, ValueType>>(initialMap)
  
  const reset = () => $set(initialMap)

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
   * from the converted object. If the value
   * is `undefined` the default value is returned.
   *
   * @param key - Key of the value to retrieve
   * @param _defaultValue - Default value (default: `null`)
   *
   * @returns Model value from the converted object
   */
  function value<T = any>(key: KeyType, _defaultValue: T = null): T {
    return ($ as any)[key] ?? _defaultValue
  }

  /**
   * Checks if all the specified keys have a non-blank value in the map.
   * 
   * @param keys The keys to check.
   * 
   * @returns True if all the keys have a non-blank value, false otherwise.
   */
  function isSet(...keys: KeyType[]): boolean {
    return keys.every((key) => !s.isBlank(value(key)))
  }

  return {
    $set,
    $,
    set,
    value,
    reset,
    isSet
  }
}

export interface TypedMap<KeyType, ObjectType, ValueType = any> {
  $set: (map: Map<KeyType, ValueType>) => void
  $: ObjectType
  set: (key: KeyType, value: ValueType) => void
  value: <T = any>(key: KeyType, defaultValue?: T) => T
  reset: () => void
  isSet: (...keys: KeyType[]) => boolean
}
