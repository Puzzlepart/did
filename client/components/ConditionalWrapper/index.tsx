/* eslint-disable tsdoc/syntax */
import { FunctionComponent, HTMLProps, ReactNode } from 'react'

/**
 * @ignore
 */
export interface IConditionalWrapperProps extends HTMLProps<HTMLDivElement> {
  condition: boolean
  wrapper: (children: ReactNode) => any
}

/**
 * @category Function Component
 */
export const ConditionalWrapper: FunctionComponent<IConditionalWrapperProps> = ({
  condition,
  wrapper,
  children
}: IConditionalWrapperProps) => (condition ? wrapper(children) : children)
