import { SigninError } from './SigninError'

export const USER_INVITATION_ACCEPTED = new SigninError(
  '37ef71e8',
  'Invitation accepted',
  'You have accepted the invitation to join did.\n\nYou will be redirected to the login page in a few seconds.',
  'Checkmark',
  'success',
  5000,
  'azuread-openidconnect'
)
