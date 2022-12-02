import { ISpinnerProps } from '@fluentui/react'
import { Role, User } from 'types'
import { IAddMultiplePanel } from './AddMultiplePanel/types'
import { IUserFormProps } from './UserForm/types'

export interface IUsersState {
  loading: boolean
  activeUsers: User[]
  disabledUsers: User[]
  adUsers: User[]
  availableAdUsers: User[]
  roles: Role[]
  userForm?: IUserFormProps
  addMultiplePanel?: IAddMultiplePanel
  progress?: ISpinnerProps
}
