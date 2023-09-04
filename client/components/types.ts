import { FC, HTMLAttributes } from 'react'

/**
 * Did reusable functional component
 *
 * @extends React.FunctionComponent
 */
export type ReusableComponent<
  T extends Omit<HTMLAttributes<any>, 'onChange' | 'defaultChecked'>
> = FC<T>
