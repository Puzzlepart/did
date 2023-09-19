import { HTMLAttributes } from 'react'
import { StyledComponent } from 'types'

/**
 * Did reusable functional component
 *
 * @extends StyledComponent
 */
export type ReusableComponent<
  T extends Omit<HTMLAttributes<any>, 'onChange' | 'defaultChecked'>
> = StyledComponent<T>
