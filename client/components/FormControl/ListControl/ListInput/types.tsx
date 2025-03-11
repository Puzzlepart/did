import { IInputFieldProps } from 'components/FormControl/InputControl'
import { User } from 'types'

/**
 * Represents a field in a list control.
 *
 * @template P - The type of the additional properties.
 */
export type ListField<P = Record<string, any>> = {
  /**
   * The unique key for the field.
   */
  key: string

  /**
   * The type of the input field or a boolean.
   */
  type: IInputFieldProps['type'] | 'boolean'

  /**
   * The label for the field.
   */
  label: string

  /**
   * Specifies how the field should be rendered.
   */
  renderAs?: 'currency' | 'boolean'

  /**
   * The default value for the field.
   */
  defaultValue?: any

  /**
   * Indicates if the field is required.
   */
  required?: boolean

  /**
   * Indicates if the field is editable.
   */
  editable?: boolean

  /**
   * The maximum width of the field.
   */
  maxWidth?: number

  /**
   * The info message for the field.
   */
  infoMessage?: string

  /**
   * Additional properties for the field input
   */
  props?: {
    /**
     * Additional properties for the input in the list.
     */
    list?: P

    /**
     * Additional properties for the input in the form.
     */
    form?: P
  }
}

export interface IListInputProps {
  /**
   * The value of the user picker.
   */
  value?: any

  /**
   * Change handler for the user picker.
   *
   * @param selectedUsers The selected users.
   */
  onChange?: (selectedUsers: User[]) => void

  /**
   * Fields to store in the list.
   */
  fields?: ListField[]

  /**
   * A function to generate a unique ID for the list items.
   */
  generateId?(): string
}

export interface IListInputState {
  /**
   * The items selected in the input.
   */
  items: any[]

  /**
   * The current item being edited.
   */
  currentItem?: any
}
