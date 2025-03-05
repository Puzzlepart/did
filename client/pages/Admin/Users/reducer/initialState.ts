import { IUsersState } from '../types'

/**
 * The initial state for the users reducer.
 */
export const initialState: IUsersState = {
  loading: true,
  users: [],
  activeUsers: [],
  disabledUsers: [],
  adUsers: [],
  availableAdUsers: [],
  selectedUsers: [],
  roles: [],
  setKey: Date.now().toString(),
}
