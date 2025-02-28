import { IInputFieldProps } from 'components/FormControl/InputControl'
import { User } from 'types'

export type ListField<P = Record<string, any>> = {
  key: string
  type: IInputFieldProps['type'] | 'boolean'
  label: string
  renderAs?: 'currency' | 'boolean'
  defaultValue?: string
  required?: boolean
  props?: P
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
