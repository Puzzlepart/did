import { FC, HTMLAttributes } from 'react'

type StyledComponentDefaultProps = HTMLAttributes<HTMLDivElement>

/**
 * A component that can be styled using CSS. Extends the `FC` interface,
 * andd adds a `className` property.
 *
 * @template T - The props type for the component.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export interface StyledComponent<T = StyledComponentDefaultProps>
  extends FC<T> {
  className?: string
}
