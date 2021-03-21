/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/prevent-abbreviations */

export interface ReactHookFunction<ParamType = {}, ReturnType = {}> {
  (params?: ParamType): ReturnType | null
  displayName?: string
}
