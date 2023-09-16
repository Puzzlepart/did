import { StyledComponent } from 'types'
import { FormInputControlBase } from './FormInputControlBase'

/**
 * A styled component that represents a form input control.
 *
 * @template T - The type of props that this component accepts.
 */

export type FormInputControlComponent<
  T extends FormInputControlBase = FormInputControlBase
> = StyledComponent<T>
