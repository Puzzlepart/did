import { ActiveDirectoryUser, ExternalUserInvitation, Role, User } from 'types'
import { IBulkImportPanelProps } from './BulkImportPanel/types'
import { IUserFormProps } from './UserForm/types'
import { IInviteExternalUserFormProps } from './InviteExternalUserForm'

export interface IUsersState {
  /**
   * Flag that indicates whether the users are loading
   */
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
   * External invitations
   */
  invitations?: ExternalUserInvitation[]

  /**
   * Properties for `UserForm`
   */
  userForm?: IUserFormProps

  /**
   * Properties for `InviteExternalUserForm`
   */
  inviteExternaluserForm?: IInviteExternalUserFormProps

  /**
   * Properties for `BulkImportPanel`
   */
  bulkImportPanel?: IBulkImportPanelProps

  /**
   * Text for the Progress bar
   */
  progress?: string

  /**
   * A key that uniquely identifies the given items. 
   * If provided, the selection will be reset when the key changes.
   */
  setKey?: string
}
