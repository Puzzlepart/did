import { ActiveDirectoryUser, Role, User } from 'types'
import { IAddMultiplePanelProps } from './BulkImportPanel/types'
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
   * Users registered in Azure Active Directory, but not in did
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
  bulkImportPanel?: IAddMultiplePanelProps

  /**
   * Text for the Progress bar
   */
  progress?: string
}
