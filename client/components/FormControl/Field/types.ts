import { LabelProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'
import { IFieldLabelProps } from './FieldLabel/types'

/**
 * Props for the Field component.
 */
export interface IFieldProps<KeyType = string>
  extends Pick<HTMLProps<HTMLDivElement>, 'className' | 'hidden' | 'onKeyDown'>,
    Pick<LabelProps, 'weight' | 'disabled'> {
  /**
   * The `name` attribute is required for the Form Control
   * to work properly.
   */
  name?: KeyType

  /**
   * Control ID for the field to store on the HTML element.
   */
  id?: string

  /**
   * The label for the field.
   */
  label?: string

  /**
   * The description for the field.
   */
  description?: string

  /**
   * Whether the field is required or not.
   */
  required?: boolean

  /**
   * The error message for the field. Will be rendered using
   * the `UserMessage` component with `intent` set to `error`.
   */
  errorMessage?: string

  /**
   * Label properties
   */
  labelProps?: IFieldLabelProps
}
