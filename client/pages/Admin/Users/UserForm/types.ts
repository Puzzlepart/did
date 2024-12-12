import { OperationVariables } from '@apollo/client'
import { IPanelProps } from 'components/Panel'
import { User, UserInput } from 'types'
import _ from 'underscore'

export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit (optional).
   */
  user?: User
}

/**
 * Variables for creating or updating a user.
 */
export interface CreateOrUpdateUserVariables extends OperationVariables {
  /**
   * The customer input object.
   */
  user: Partial<UserInput>

  /**
   * Flag that decides whether to update or create a customer.
   */
  update?: boolean
}

/**
 * Returns the role of a user. It will return the user's role name if the role is a string,
 * or the role's name if the role is an object. If the role is not defined, it will return
 * the default role. This is needed because when editing a user, the user's role is an object
 * and when changing the role, the role is a string.
 *
 * @param user - The user object.
 * @param defaultRole - The default role to return if the user's role is not defined.
 */
function getUserRole(user: User, defaultRole: string): string {
  if (typeof user?.role === 'string') {
    return user.role
  } else if (typeof user?.role === 'object') {
    return user.role?.name ?? defaultRole
  } else {
    return defaultRole
  }
}

/**
 * Creates a new user input object from a user object, omitting
 * the `__typename` and `photo` fields and converting the `role`
 * field to its name using `getUserRole`.
 *
 * @param user The user object to create the input from.
 * @param defaultRole The default role to use if the user object does not have a role (which should not happen)
 */
export function createUserInput(user: User, defaultRole = 'User'): UserInput {
  if (!user) return null
  const userInput: UserInput = _.omit(
    {
      ...user,
      role: getUserRole(user, defaultRole)
    },
    '__typename',
    'photo'
  ) as UserInput
  return userInput
}
