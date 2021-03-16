import { PERMISSION } from 'config/security/permissions'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n'
import { config } from 'package'
import { createContext } from 'react'
import { Role, Subscription, User } from 'types'
import { contains } from 'underscore'
import { tryParseJson } from 'utils'
import { useNotificationsQuery } from './hooks'

export class ContextUser {
  public id: string
  public displayName: string
  public role: Role
  public mail: string
  public startPage: string
  public configuration: { [key: string]: any }

  /**
   * Constructor
   *
   * @param _user - User object
   */
  constructor(private _user?: User) {
    if (_user) {
      this.id = _user.id
      this.displayName = _user.displayName
      this.mail = _user.mail
      this.role = _user.role as Role
      this.startPage = _user.startPage
      this.configuration = tryParseJson(_user.configuration, {})
    }
  }

  /**
   * Preferred user language
   */
  public get preferredLanguage() {
    if (!this._user) return DEFAULT_LANGUAGE
    switch ((this._user.preferredLanguage || '').toLowerCase()) {
      case 'nb-no':
        return 'nb'
      case 'nn-no':
        return 'nn'
      default: {
        if (contains(SUPPORTED_LANGUAGES, this._user?.preferredLanguage)) {
          return this._user.preferredLanguage
        }
        return config.app.DEFAULT_USER_LANGUAGE
      }
    }
  }

  /**
   * Checks if the user has the specified permission
   *
   * @param permission - Permission
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

  /**
   * Notifications query
   */
  notificationsQuery?: ReturnType<typeof useNotificationsQuery>
}

export const AppContext = createContext<IAppContext>(null)
