/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'underscore'
import { parseUrlHash } from './getUrlState'
import { isNullish } from './isNullish'

/**
 * Helper function for `persistUrlState` that sets the URL hash based on an object.
 *
 * @param object Object to be set as the URL hash
 */
function setUrlHash(object: Record<string, any>) {
  const hash = Object.keys(object)
    .filter((key) => object[key] !== null && object[key] !== undefined)
    .map((key) => `${key}=${object[key]}`)
    .join('&')
  document.location.hash = hash
}

/**
 * Helper function for `persistUrlState` that converts an object to a URL-safe string.
 *
 * @param object The object to be converted
 * @param includeNullishValues Flag to include nullish values from the object
 */
function getObjectValue(
  object: Record<string, any>,
  includeNullishValues: boolean
) {
  // Return null for invalid inputs
  if (!object || _.isArray(object)) return null

  // Create a filtered copy of the object
  const objectValue = includeNullishValues
    ? { ...object } // Include all values
    : Object.fromEntries(
        Object.entries(object).filter(
          ([_, value]) => !isNullish(value) // Exclude nullish values
        )
      )

  // If object is empty after filtering, return null
  return Object.keys(objectValue).length > 0
    ? window.btoa(JSON.stringify(objectValue)).replace(/=/g, '')
    : null
}

/**
 * Persists an object as a URL parameter or hash fragment.
 *
 * @param object - The object to be persisted in the URL.
 * @param key - The key under which the object will be stored.comm
 * @param location - The location in the URL where the object will be stored ('hash' or 'search').
 * @param includeNullishValues - Whether to include nullish values in the URL (default: `true`).
 *
 * @remarks
 * The object is serialized to a JSON string and then encoded using Base64.
 * If `location` is 'hash', the key-value pair is stored in the URL hash fragment.
 * If `location` is 'search', the key-value pair is stored in the URL search parameters.
 */
export function persistUrlState<T = Record<string, any>>(
  object: T,
  key: string,
  location: 'hash' | 'search',
  includeNullishValues = true
) {
  const currentState = parseUrlHash()
  let value: any = object
  if (typeof object !== 'string') {
    value = getObjectValue(object, includeNullishValues)
  }
  if (location === 'hash') {
    setUrlHash({ ...currentState, [key]: value })
    return
  }
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.pushState({}, '', url.toString())
}
