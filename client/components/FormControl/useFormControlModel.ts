/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */
import { useMap } from 'hooks/common/useMap'
import { useEffect } from 'react'
import { convertToMap, omitTypename } from 'utils'

/**
 * Returns a map of form control values and their corresponding update functions.
 * When a `postUpdate` function is provided, the initial model is converted to a
 * a map and `__typename` properties are omitted as they should not be including
 * when sending a mutation to GraphQL.
 *
 * @param initialModel An optional object containing initial form control values.
 * @param postUpdate An optional function that is called before the model is set
 * in the `useEffect` hook. This is useful for converting the initial model to
 * a different format.
 *
 * @returns A map of form control values and their corresponding update functions.
 */
export function useFormControlModel<KeyType, ObjectType extends Record<string, any> = Record<string, any>>(
  initialModel: ObjectType = null,
  postUpdate?: (initialModel: ObjectType) => ObjectType
) {
  const map = useMap<KeyType, ObjectType>()
  useEffect(() => {
    if (!initialModel || Object.keys(initialModel).length === 0) return
    const obj = postUpdate ? postUpdate(initialModel) : initialModel
    const typeNameOmmited = omitTypename(obj)
    const _map = convertToMap<KeyType>(typeNameOmmited)
    map.$set(_map)
  }, [initialModel])

  return map
}
