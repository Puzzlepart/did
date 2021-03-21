/* eslint-disable tsdoc/syntax */
import { FC, HTMLProps, ReactNode } from 'react'

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
 * @category Function Component
 */
export const ConditionalWrapper: FC<IConditionalWrapperProps> = ({
  condition,
  wrapper,
  children
}: IConditionalWrapperProps) => (condition ? wrapper(children) : children)
