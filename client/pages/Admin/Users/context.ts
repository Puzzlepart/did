import { createContext } from 'react'
import { Role, User } from 'types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsersContext {
  /**
   * Available roles
   */
  roles: Role[]

  /**
   * Registered users
   */
  users: User[]

  /**
   * Active Directory users
   */
  activeDirectoryUsers: User[]
}

export const UsersContext = createContext<IUsersContext>(null)
