import { HTMLAttributes } from 'react'

export interface IFormGroupProps
  extends Omit<HTMLAttributes<any>, 'onChange' | 'defaultChecked'> {
  gap?: number
  bordered?: boolean
}
