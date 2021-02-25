import { isObject } from 'underscore'

/**
 * Deep merge two objects
 * 
 * @see https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
 * 
 * @param {T} target Target
 * @param {T[]} ...sources
 */
export function mergeDeep<T = any>(target: T, ...sources: T[]) {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeDeep(target, ...sources)
}