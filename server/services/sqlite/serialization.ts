/**
 * Serialization utilities for SQLite document storage.
 * Handles encoding/decoding of special types (Dates) to JSON-safe representations.
 * @module server/services/sqlite/serialization
 */

import _ from 'lodash'
import { DATE_TYPE, TYPE_FIELD } from './constants'

type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject

interface JsonObject {
  [key: string]: JsonValue
}

type EncodedDate = {
  [TYPE_FIELD]: typeof DATE_TYPE
  value: string
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
      value: value.toISOString()
    }
    return encoded as unknown as JsonValue
  }
  if (Array.isArray(value)) {
    return value.map((entry) => encodeSpecialTypes(entry))
  }
  if (isPlainObject(value)) {
    return Object.entries(value).reduce<JsonObject>((encoded, [key, entry]) => {
      encoded[key] = encodeSpecialTypes(entry)
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
    if (value[TYPE_FIELD] === DATE_TYPE && typeof value.value === 'string') {
      return new Date(value.value)
    }
    return Object.entries(value).reduce<Record<string, any>>(
      (decoded, [key, entry]) => {
        decoded[key] = decodeSpecialTypes(entry as JsonValue)
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
