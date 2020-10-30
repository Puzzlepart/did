/**
 * Makes a deep copy of the object
 * 
 * See https://gist.github.com/Billy-/d94b65998501736bfe6521eadc1ab538
 *
 * @param {Object} value Value
 * @param {string} key Key to omit
 */
export function omitDeep(value: any, key: string) {
    if (Array.isArray(value)) return value.map(i => omitDeep(i, key))
    else if (typeof value === 'object' && value !== null) {
        return Object.keys(value).reduce((newObject, k) => {
            if (k == key) return newObject
            return Object.assign(
                { [k]: omitDeep(value[k], key) },
                newObject
            )
        }, {})
    }
    return value
}