import { ISubscription } from './ISubscription'
import { IRole } from './IRole'


export interface IUser {
  id?: string
  displayName?: string
  givenName?: string
  surname?: string
  jobTitle?: string
  mobilePhone?: string
  mail?: string
  preferredLanguage?: string
  subscription?: ISubscription
  role?: IRole
}
