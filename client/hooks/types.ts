/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/prevent-abbreviations */

/**
 * Use to strictly type a `react` hook with a param type
 * and return type.
 *
 * @see https://reactjs.org/docs/hooks-intro.html
 */
export interface ReactHookFunction<HookParamType = {}, HookReturnType = {}> {
  (params?: HookParamType): HookReturnType | null
  displayName?: string
}
