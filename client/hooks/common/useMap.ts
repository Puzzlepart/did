import _ from 'lodash'
import { useState } from 'react'
import setValue from 'set-value'
import s from 'underscore.string'

/**
 * Options for the `useMap` hook.
 */
export type UseMapOptions = {
  /**
   * If `true`, the keys of the map are treated as nested property paths.
   * For instance `set('a.b', 1)` will set the value of `b` on the object
   * at the key `a`. If `false`, the key is treated as a single key even
   * if it contains one or serveral dots.
   */
  useNestedKeys?: boolean
}

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
>(
  initialMap = new Map(),
  options: UseMapOptions = {}
): TypedMap<KeyType, ObjectType, ValueType> {
  const [$map, $set] = useState<Map<KeyType, ValueType>>(initialMap)

  const reset = () => $set(initialMap)

  /**
   * Object representation of the `Map`
   *
   * The `Map` is converted to an object using
   * `[...$map].reduce`
   */
  const $: ObjectType = [...$map].reduce(
    (object, [key, value]) => setValue(object, key as any, value),
    {} as any
  )

  /**
   * Set `key` of `model`. If the key is a nested
   * property path, the value is set using `_.set`.
   *
   * @param key - Key
   * @param value - Value
   */
  const set = (key: KeyType, value: ValueType) => {
    if (!key) return
    const [property, ...nestedKeys] = key.toString().split('.') as [
      KeyType,
      ...string[]
    ]
    if (_.isEmpty(nestedKeys) || !options.useNestedKeys)
      return $set(new Map($map).set(key, value))
    else {
      let newValue = $map.get(property) ?? ({} as any)
      newValue = _.set(newValue, nestedKeys.join('.'), value)
      return $set(new Map($map).set(property, newValue))
    }
  }

  /**
   * Get model value. The value is retrived
   * from the converted object. If the value
   * is `undefined` the default value is returned.
   * If the key is a nested property path, the value
   * is retrieved using `_.get`.
   *
   * @param key Key of the value to retrieve
   * @param _defaultValue Default value (default: `null`)
   *
   * @returns Model value from the converted object
   */
  function value<T = ValueType>(key?: KeyType, _defaultValue: T = null): T {
    if (!key) return $ as unknown as T
    const [property, ...nestedKeys] = key.toString().split('.') as [
      KeyType,
      ...string[]
    ]
    let value = $map.get(key) as unknown as T
    if (_.isEmpty(nestedKeys) || !options.useNestedKeys)
      return value ?? _defaultValue
    value = $map.get(property) as unknown as T
    return _.get(value, nestedKeys.join('.'), _defaultValue) as T
  }

  /**
   * Checks if all the specified keys have a non-blank value in the map.
   *
   * @param keys The keys to check.
   *
   * @returns True if all the keys have a non-blank value, false otherwise.
   */
  function isSet(...keys: KeyType[]): boolean {
    const _keys = keys.filter(Boolean)
    if (_keys.length === 0) return false
    return keys.filter(Boolean).every((key) => !s.isBlank(value(key)))
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

/**
 * A typed map interface that provides type safety for keys and values.
 * @template KeyType The type of the keys in the map.
 * @template ObjectType The type of the object that contains the map.
 * @template ValueType The type of the values in the map. Defaults to `any`.
 */
export interface TypedMap<KeyType, ObjectType, ValueType = any> {
  /**
   * Sets the entire map to the given `Map`.
   *
   * @param map The `Map` to set the typed map to.
   */
  $set: (map: Map<KeyType, ValueType>) => void

  /**
   * The object representation of the map.
   */
  $: ObjectType

  /**
   * Sets the value of the given key in the map.
   *
   * @param key The key to set the value for.
   * @param value The value to set for the given key.
   */
  set: (key: KeyType, value: ValueType) => void

  /**
   * Gets the value of the given key in the map.
   * If no key is specified the entire object (`$`) is returned.
   *
   * @param key The key to get the value for.
   * @param defaultValue The default value to return if the key is not found in the map.
   *
   * @returns The value of the given key in the map, or the default value if the key is not found.
   */
  value: <T = any>(key?: KeyType, defaultValue?: T) => T

  /**
   * Resets the entire map to an empty `Map`.
   */
  reset: () => void

  /**
   * Checks if all of the given keys are set in the map.
   *
   * @param keys The keys to check for in the map.
   *
   * @returns `true` if all of the given keys are set in the map, `false` otherwise.
   */
  isSet: (...keys: KeyType[]) => boolean
}
