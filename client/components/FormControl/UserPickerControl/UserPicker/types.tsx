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

export interface IUserPickerProps {
  placeholder?: string
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
  additionalMetadata?: Record<string, string>
}

export interface IUserPickerState {
  /**
   * Whether the query is still loading.
   * This is handled by the `useUserPickerQuery` hook.
   */
  loading: boolean

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
