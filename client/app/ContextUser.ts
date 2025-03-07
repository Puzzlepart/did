import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n'
import { PermissionScope } from 'security'
import { UserTheme } from 'theme/types'
import { Role, User, UserPhoto, UserTimebank } from 'types'
import _ from 'underscore'
import { tryParseJson } from 'utils'
import { getTheme } from '../theme'

/**
 * `ContextUser` is the user object used for
 * the `AppContext`
 */
export class ContextUser {
  public id: string
  public displayName: string
  public role: Role
  public mail: string
  public startPage: string
  public configuration: Record<string, any>
  public photo: UserPhoto
  public theme: UserTheme
  public lastActive: Date
  public timebank: UserTimebank
  public isExternal: boolean

  /**
   * Constructor for `ContextUser`
   *
   * Assigns the following properties
   * from the User object:
   *
   * * `id`
   * * `displayName`
   * * `mail`
   * * `role`
   * * `startPage`
   * * `photo`
   * * `lastActive`
   * * `timebank`
   * * `isExternal`
   *
   * We can't extend the `User` class
   * due the usage of [type-graphql](https://www.npmjs.com/package/type-graphql)
   * decorators.
   *
   * @param _user - User object
   */
  constructor(private _user?: User) {
    if (_user) {
      Object.assign(
        this,
        _.pick(
          _user,
          'id',
          'displayName',
          'mail',
          'role',
          'startPage',
          'photo',
          'lastActive',
          'timebank',
          'isExternal'
        )
      )
      this.configuration = tryParseJson(_user.configuration, {})
      this.theme = getTheme(this.configuration?.ui?.theme)
    } else {
      this.theme = getTheme('default')
    }
  }

  /**
   * Preferred user language
   *
   * - `nb-no` are mapped to `nb`
   * - `nn-no` are mapped to `nn`
   * - Default is `en-GB`
   */
  public get preferredLanguage() {
    if (!this._user) return DEFAULT_LANGUAGE
    switch ((this._user.preferredLanguage || '').toLowerCase()) {
      case 'nb-no': {
        return 'nb'
      }
      case 'nn-no': {
        return 'nn'
      }
      default: {
        if (_.contains(SUPPORTED_LANGUAGES, this._user?.preferredLanguage)) {
          return this._user.preferredLanguage
        }
        return 'en-GB'
      }
    }
  }

  /**
   * Checks if the user has the specified permission
   *
   * @param permission - Permission
   */
  public hasPermission?(permission?: PermissionScope): boolean {
    if (!permission) return true
    return _.contains(this.role?.permissions, permission)
  }
}
