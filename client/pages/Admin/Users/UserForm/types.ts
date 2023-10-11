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
 * Creates a new user input object from a user object, omitting the `__typename` and `photo` fields and converting the `role` field to its name.
 *
 * @param user The user object to create the input from.
 * @param defaultRole The default role to use if the user object does not have a role (which should not happen)
 */
export function createUserInput(user: User, defaultRole = 'User'): UserInput {
  if (!user) return null
  return _.omit(
    {
      ...user,
      role: user.role ? user.role['name'] : defaultRole
    },
    '__typename',
    'photo'
  )
}
