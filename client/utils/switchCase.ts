type CasePredicate<R = any> = (v: R) => boolean
type Case<R = any, T = any> = [CasePredicate<R>, T]

/**
 * Evaluates a value against a list of cases and returns the result of the first matching case.
 *
 * @template T - The type of the value to be evaluated.
 * @template R - The type of the result to be returned.
 *
 * @param  cases - An array of tuples where the first element is a predicate function
 * that takes the value and returns a boolean, and the second element is the result to be returned
 * if the predicate matches.
 * @param  value - The value to be evaluated against the cases.
 * @param defaultCase - The default case to return if no cases match.
 *
 * @returns The result of the first matching case, or `undefined` if no cases match.
 */
export function switchCase<T, R>(
  cases: Case<T, R>[],
  value: T = null,
  defaultCase: R = null
): R | undefined {
  return cases.find(([predicate]) => predicate(value))?.[1] ?? defaultCase
}
