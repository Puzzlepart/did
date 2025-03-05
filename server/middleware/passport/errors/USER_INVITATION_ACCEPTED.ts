import { User } from '../../../graphql'
import { SigninError } from './SigninError'

/**
 * User invitation accepted "error". This is not
 * an error but a message that the user has accepted
 * the invitation to join did. The user will be
 * redirected to the login page in a few seconds
 * on the client side due to properties of this
 * `SigninError`.
 *
 * @param invitedBy - The user who invited the external user
 * @param delay - The delay in seconds before redirecting to the login page
 */
export const USER_INVITATION_ACCEPTED = (invitedBy: User, delay = 5) =>
  new SigninError(
    'invitation_accepted',
    'Invitation accepted',
    `You have accepted the invitation to join did from ${invitedBy.displayName}.\n\nYou will be redirected to the login page in ${delay} seconds.`,
    'Checkmark',
    'success',
    delay * 1000,
    'azuread-openidconnect'
  )
