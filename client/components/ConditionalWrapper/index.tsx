import { ReusableComponent } from 'components/types'
import { HTMLProps } from 'react'

/**
 * @ignore
 */
export interface IConditionalWrapperProps extends HTMLProps<HTMLDivElement> {
  condition: boolean
  wrapper: (children: any) => any
}

/**
 * Conditionally wraps `children` in `wrapper` based on `condition`.
 *
 * @category Reusable Component
 */
export const ConditionalWrapper: ReusableComponent<IConditionalWrapperProps> =
  ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children
