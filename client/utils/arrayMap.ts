/* eslint-disable unicorn/prevent-abbreviations */
/**
 * Array map that removes falsy values.
 *
 * @param arr - Array
 * @param callbackfn - Map callback function
 */
export function arrayMap<T = any, R = any>(
  arr: T[],
  callbackfn: (value: T, index: number) => R
): R[] {
  if (!arr) return []
  return arr
    .map((value: T, index: number) => callbackfn(value, index))
    .filter(Boolean)
}
