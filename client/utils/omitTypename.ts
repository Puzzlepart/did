import { deepCopy } from './deepCopy'
import { omitDeep } from './omitDeep'

/**
 * Omits `__typename` from the `obj`
 *
 * @param obj - Object
 */
export function omitTypename<T = any>(object: T): T {
  return omitDeep(deepCopy(object), '__typename')
}
