import _ from 'underscore'

/**
 * Get first part in the the string separated by separarator
 *
 * @param string_ - String
 * @param separarator - Separator, defaults to space
 */
export function firstPart(string_: string = '', separarator = ' '): string {
  return _.first(string_.split(separarator))
}
