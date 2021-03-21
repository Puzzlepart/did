/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/prevent-abbreviations */

export interface ReactHookFunction<ParamType = {}, ReturnType = {}> {
  (params: ParamType): ReturnType | void
  displayName?: string
}
