import AppConfig from 'AppConfig'
import { PERMISSION } from 'config/security/permissions'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n'
import { createContext } from 'react'
import { Role, Subscription, User } from 'types'
import { contains } from 'underscore'

export class ContextUser {
  public id: string
  public displayName: string
  public role: Role
  public mail: string
  public preferredLanguage: string

  /**
   * Constructor
   * 
   * @param {User} _user User object
   */
  constructor(private _user?: User) {
    if (!_user) {
      this.preferredLanguage = DEFAULT_LANGUAGE
    } else {
      this.id = _user.id
      this.displayName = _user.displayName
      this.mail = _user.mail
      this.role = _user.role
      this.preferredLanguage = _user.preferredLanguage
    }
  }

  /**
   * User configuration
   */
  public get configuration() {
    return {
      reportFilters: JSON.parse(this._user.reportFilters)
    }
  }

  /**
   * User language
   */
  public get language() {
    if (contains(SUPPORTED_LANGUAGES, this.preferredLanguage)) {
      return this.preferredLanguage
    }
    return AppConfig.DEFAULT_USER_LANGUAGE
  }

  /**
   * Checks if the user has the specified permission
   *
   * @param {PERMISSION} permission Permission
   */
  public hasPermission?(permission?: PERMISSION): boolean {
    if (!permission) return true
    return contains(this.role?.permissions, permission)
  }
}

export interface IAppContext {
  /**
   * The currently logged in user
   */
  user?: ContextUser

  /**
   * Subscription
   */
  subscription?: Subscription
}

export const AppContext = createContext<IAppContext>(null)
