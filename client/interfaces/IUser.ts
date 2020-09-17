import { ISubscription } from './ISubscription'
import { IRole } from './IRole'

/**
 * @category Common
 */
export interface IUser {
  id?: string
  displayName?: string
  mail?: string
  role?: IRole
  subscription?: ISubscription
  preferredLanguage?: 'en-GB' | 'nb'
}
