import { IInputFieldProps } from 'components/FormControl/InputControl'
import { User } from 'types'

export type ListField<P = Record<string, any>> = {
  key: string
  type: IInputFieldProps['type']
  label: string
  renderAs?: 'currency'
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
