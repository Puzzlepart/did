import { PERMISSION } from 'config/security/permissions'
import { createContext } from 'react'
import { Role, Subscription, User } from 'types'
import { contains } from 'underscore'
import { supportedLanguages } from '../.resources'

export class ContextUser {
    public id: string
    public displayName: string
    public role: Role
    public mail: string
    private _preferredLanguage: string

    constructor(user?: User) {
        if (!user) {
            this._preferredLanguage = 'en-GB'
        } else {
            this.id = user.id
            this.displayName = user.displayName
            this.mail = user.mail
            this.role = user.role
            this._preferredLanguage = user.preferredLanguage
        }
    }

    /**
     * User language
     */
    public get language() {
        if (contains(supportedLanguages, this._preferredLanguage)) {
            return this._preferredLanguage
        }
        return 'en-GB'
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
    user?: ContextUser;

    /**
     * Subscription
     */
    subscription?: Subscription;

    /**
     * Error
     */
    error?: any;
}

export const AppContext = createContext<IAppContext>(null)