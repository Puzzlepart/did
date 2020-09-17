import { ISubscription } from './ISubscription'
import { IRole } from './IRole'

/**
 * @category Common
 */
export interface IUser {
  id?: string
  displayName?: string
  email?: string
  role?: IRole
  sub?: ISubscription
  preferredLanguage?: 'en-GB' | 'nb'
}
