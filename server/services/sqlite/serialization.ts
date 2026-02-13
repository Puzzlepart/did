/**
 * Serialization utilities for SQLite document storage.
 * Handles encoding/decoding of special types (Dates) to JSON-safe representations.
 * @module server/services/sqlite/serialization
 */

import _ from 'lodash'
import { DATE_TYPE, ENCODED_FIELD, TYPE_FIELD } from './constants'

type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject

interface JsonObject {
  [key: string]: JsonValue
}

type EncodedDate = {
  [TYPE_FIELD]: typeof DATE_TYPE
  [ENCODED_FIELD]: true
  value: string
}

const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

const setSafeProperty = (
  target: Record<string, any>,
  key: string,
  value: any
): void => {
  if (DANGEROUS_KEYS.has(key)) {
    Object.defineProperty(target, key, {
      value,
      enumerable: true,
      writable: true,
      configurable: true
    })
    return
  }
  target[key] = value
}

/**
 * Checks if a value is a plain object (not an array, Date, or other special object).
 */
export const isPlainObject = (value: unknown): value is Record<string, any> =>
  _.isPlainObject(value)

/**
 * Encodes special JavaScript types into JSON-safe representations.
 * Primarily handles Date objects by wrapping them with a type marker.
 *
 * @param value - Any JavaScript value to encode
 * @returns JSON-safe value with type markers for special types
 */
export const encodeSpecialTypes = (value: any): JsonValue => {
  if (value instanceof Date) {
    const encoded: EncodedDate = {
      [TYPE_FIELD]: DATE_TYPE,
      [ENCODED_FIELD]: true,
      value: value.toISOString()
    }
    return encoded as unknown as JsonValue
  }
  if (Array.isArray(value)) {
    return value.map((entry) => encodeSpecialTypes(entry))
  }
  if (isPlainObject(value)) {
    return Object.entries(value).reduce<JsonObject>((encoded, [key, entry]) => {
      setSafeProperty(encoded as unknown as Record<string, any>, key, encodeSpecialTypes(entry))
      return encoded
    }, {})
  }
  return value
}

/**
 * Decodes JSON values back to their original JavaScript types.
 * Restores Date objects from their encoded wrapper format.
 *
 * @param value - JSON value potentially containing encoded types
 * @returns Original JavaScript value with restored types
 */
export const decodeSpecialTypes = (value: JsonValue): any => {
  if (Array.isArray(value)) {
    return value.map((entry) => decodeSpecialTypes(entry))
  }
  if (isPlainObject(value)) {
    // Date decoding:
    // - New format: requires ENCODED_FIELD marker (prevents accidental collisions)
    // - Old format: accepted only when it matches the exact legacy shape
    if (
      value[TYPE_FIELD] === DATE_TYPE &&
      typeof (value as any).value === 'string' &&
      (
        (value as any)[ENCODED_FIELD] === true ||
        Object.keys(value).length === 2
      )
    ) {
      const date = new Date((value as any).value)
      if (!Number.isNaN(date.getTime())) return date
    }

    return Object.entries(value).reduce<Record<string, any>>(
      (decoded, [key, entry]) => {
        setSafeProperty(decoded, key, decodeSpecialTypes(entry as JsonValue))
        return decoded
      },
      {}
    )
  }
  return value
}

/**
 * Serializes a document to JSON string with special type encoding.
 *
 * @param document - Document object to serialize
 * @returns JSON string representation
 */
export const serializeDocument = (document: Record<string, any>): string => {
  return JSON.stringify(encodeSpecialTypes(document))
}

/**
 * Deserializes a JSON string back to a document with restored types.
 *
 * @param json - JSON string to deserialize
 * @returns Document object with restored types
 */
export const deserializeDocument = (json: string): Record<string, any> => {
  return decodeSpecialTypes(JSON.parse(json)) as Record<string, any>
}
