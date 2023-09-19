import { HTMLAttributes } from 'react'

export interface IJsonDebugProps extends HTMLAttributes<HTMLDivElement> {
  obj: any
  replacer?: (this: any, key: string, value: any) => any
  space?: number | string
}
