/* eslint-disable unicorn/prevent-abbreviations */
/**
 * Array map with `null` / `undefined` check
 *
 * @param arr - Array
 * @param callbackfn - Map callback function
 */
export function arrayMap<T = any>(
    arr: T[],
    callbackfn: (value: T, index: number) => T
) {
    if (!arr) return []
    return arr.map((value: T, index: number) => callbackfn(value, index))
}
