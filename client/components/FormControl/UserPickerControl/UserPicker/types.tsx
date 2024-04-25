import { User } from 'types'

export interface IUserPickerProps {
  placeholder?: string
  value?: any
  noSelectionText?: string
  onChange?: (selectedUsers: User[]) => void
  multiple?: boolean
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
  selectedUser?: User

  /**
   * The currently selected users in the list.
   * This is only used when `multiple` is true.
   */
  selectedUsers?: User[]
}
