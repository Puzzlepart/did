import { IInputFieldProps } from 'components/FormControl/InputControl'
import { User } from 'types'

export type SingleUserPickerValue = string
export type UserInfo = {
  id: string
  [key: string]: any
}
export type MultiUserPickerValue = UserInfo[]
export type UserPickerValue = SingleUserPickerValue | MultiUserPickerValue

type UserWithMetadata = User & {
  additionalMetadata?: Record<string, string>
}

export type AdditionalMetadataField = {
  type: IInputFieldProps['type']
  label: string
  renderAs?: 'currency'
}

export interface IUserPickerProps {
  /**
   * The placeholder text for the user picker.
   */
  placeholder?: string

  /**
   * The value of the user picker.
   */
  value?: UserPickerValue

  /**
   * Change handler for the user picker.
   *
   * @param selectedUsers The selected users.
   */
  onChange?: (selectedUsers: User[]) => void

  /**
   * Whether the user picker should allow selecting multiple users.
   * If true, the user picker will show a list of selected users.
   */
  multiple?: boolean

  /**
   * Additional metadata to be stored with the users.
   * Only used when `multiple` is true.
   */
  additionalMetadata?: Record<string, AdditionalMetadataField>
}

export interface IUserPickerState {
  /**
   * Whether the data for the user picker has been loaded.
   */
  isDataLoaded: boolean

  /**
   * All the available users in the picker.
   * This is used to populate the picker.
   * This is handled by the `useUserPickerQuery` hook.
   */
  users: User[]

  /**
   * The currently selected user in the picker.
   */
  selectedUser?: UserWithMetadata

  /**
   * The currently selected users in the list.
   * This is only used when `multiple` is true.
   */
  selectedUsers?: UserWithMetadata[]
}
