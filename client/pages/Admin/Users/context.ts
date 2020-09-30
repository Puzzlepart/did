import { IRole, IUser } from 'types'
import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsersContext {
  /**
   * Available roles
   */
  roles: IRole[]

  /**
   * Registered users
   */
  users: IUser[]

  /**
   * Active Directory users
   */
  adUsers: IUser[]
}

export const UsersContext = createContext<IUsersContext>(null)
