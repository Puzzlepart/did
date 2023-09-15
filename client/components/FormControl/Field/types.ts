import { LabelProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'

/**
 * Props for the Field component.
 */
export interface IFieldProps
  extends Pick<HTMLProps<HTMLDivElement>, 'className' | 'hidden' | 'onKeyDown'>,
    Pick<LabelProps, 'weight' | 'disabled'> {
  /**
   * The label for the field.
   */
  label?: string

  /**
   * The description for the field.
   */
  description?: string

  required?: boolean

  /**
   * The error message for the field. Will be rendered using
   * the `UserMessage` component with `intent` set to `error`.
   */
  errorMessage?: string
}
