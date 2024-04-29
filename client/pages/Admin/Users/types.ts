import { ActiveDirectoryUser, Role, User } from 'types'
import { IBulkImportPanelProps } from './BulkImportPanel/types'
import { IUserFormProps } from './UserForm/types'

export interface IUsersState {
  loading: boolean

  /**
   * All users in did. Both active and disabled.
   */
  users: User[]

  /**
   * Active users (`accountEnabled` **not** set to `false`)
   */
  activeUsers: User[]

  /**
   * Disabled users (`accountEnabled` set to `false`)
   */
  disabledUsers: User[]

  /**
   * All users registered in Azure Active Directory
   */
  adUsers: ActiveDirectoryUser[]

  /**
   * Users registered in Azure Active Directory with a valid email address, 
   * that are not already registered in the system.
   */
  availableAdUsers: ActiveDirectoryUser[]

  /**
   * Users selected in the list
   */
  selectedUsers: User[]

  /**
   * All roles
   */
  roles: Role[]

  /**
   * Properties for `UserForm`
   */
  userForm?: IUserFormProps

  /**
   * Properties for `BulkImportPanel`
   */
  bulkImportPanel?: IBulkImportPanelProps

  /**
   * Text for the Progress bar
   */
  progress?: string
}
