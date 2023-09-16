/* eslint-disable no-console */
import { useMap } from 'hooks/common/useMap'
import { useEffect } from 'react'
import { convertToMap } from 'utils'

/**
 * Returns a map of form control values and their corresponding update functions.
 *
 * @param initialModel An optional object containing initial form control values.
 *
 * @returns A map of form control values and their corresponding update functions.
 */

export function useFormControlModel<KeyType, ObjectType = Record<string, any>>(
  initialModel = null
) {
  const map = useMap<KeyType, ObjectType>()
  useEffect(() => {
    if (!initialModel) return
    map.$set(convertToMap(initialModel))
  }, [initialModel])
  return map
}
