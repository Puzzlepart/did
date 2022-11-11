import { ReusableComponent } from 'components/types'
import { HTMLProps, ReactNode } from 'react'

/**
 * @ignore
 */
export interface IConditionalWrapperProps extends HTMLProps<HTMLDivElement> {
  condition: boolean
  wrapper: (children: ReactNode) => any
}

/**
 * Conditionally wraps `children` in `wrapper` based on `condition`
 *
 * @category Reusable Component
 */
export const ConditionalWrapper: ReusableComponent<IConditionalWrapperProps> =
  ({ condition, wrapper, children }: IConditionalWrapperProps) =>
    condition ? wrapper(children) : children
