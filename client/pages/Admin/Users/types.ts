import { ISpinnerProps } from '@fluentui/react'
import { ActiveDirectoryUser, Role, User } from 'types'
import { IAddMultiplePanelProps } from './AddMultiplePanel/types'
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
   * All roles
   */
  roles: Role[]

  /**
   * Properties for `UserForm`
   */
  userForm?: IUserFormProps

  /**
   * Properties for `AddMultiplePanel`
   */
  addMultiplePanel?: IAddMultiplePanelProps

  /**
   * Properties for `Spinner`
   */
  progress?: ISpinnerProps
}
