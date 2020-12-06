
import { FunctionComponent, HTMLProps, ReactNode } from 'react'

export interface IConditionalWrapperProps extends HTMLProps<HTMLDivElement> {
    condition: boolean
    wrapper: (children: ReactNode) =>any
}

export const ConditionalWrapper: FunctionComponent<IConditionalWrapperProps> = ({ condition, wrapper, children }: IConditionalWrapperProps) =>
    condition ? wrapper(children) : children