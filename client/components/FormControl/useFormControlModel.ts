/* eslint-disable no-console */
import { useMap } from 'hooks/common/useMap'
import { useEffect } from 'react'
import { convertToMap } from 'utils'

/**
 * Returns a map of form control values and their corresponding update functions.
 *
 * @param initialModel An optional object containing initial form control values.
 * @param postUpdate An optional function that is called before the model is set
 * in the `useEffect` hook. This is useful for converting the initial model to
 * a different format.
 *
 * @returns A map of form control values and their corresponding update functions.
 */

export function useFormControlModel<KeyType, ObjectType = Record<string, any>>(
  initialModel: ObjectType = null,
  postUpdate?: (initialModel: ObjectType) => ObjectType
) {
  const map = useMap<KeyType, ObjectType>()
  useEffect(() => {
    if (!initialModel) return
    map.$set(convertToMap(postUpdate ? postUpdate(initialModel) : initialModel))
  }, [initialModel])
  return map
}
