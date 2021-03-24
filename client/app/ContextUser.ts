import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from 'i18n'
import { config } from 'package'
import { PermissionScope } from 'security'
import { Role, User, UserPhoto } from 'types'
import { contains, pick } from 'underscore'
import { tryParseJson } from 'utils'

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

  /**
   * Constructor for `ContextUser`
   *
   * Assigns the following properties
   * from the User object:
   *
   * * id
   * * displayName
   * * mail
   * * role
   * * startPage
   * * photo
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
        pick(_user, 'id', 'displayName', 'mail', 'role', 'startPage', 'photo')
      )
      this.configuration = tryParseJson(_user.configuration, {})
    }
  }

  /**
   * Preferred user language
   *
   * - `nb-no` are mapped to `nb`
   * - `nn-no` are mapped to `nn`
   * - Default is `config.app.DEFAULT_USER_LANGUAGE`
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
  public hasPermission?(permission?: PermissionScope): boolean {
    if (!permission) return true
    return contains(this.role?.permissions, permission)
  }
}
