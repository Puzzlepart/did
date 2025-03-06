import { HTMLAttributes } from 'react'
import { StyledComponent } from 'types'

/**
 * did reusable functional component
 *
 * @extends StyledComponent
 */
export type ReusableComponent<
  T extends Omit<HTMLAttributes<any>, 'onChange' | 'defaultChecked' | 'role'>
> = StyledComponent<T>
