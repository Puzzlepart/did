/**
 * @internal
 */
declare namespace Express {
  /**
   * @internal
   */
  interface UserSubscription {
    id: string
    name: string
    settings: any
  }

  /**
   * @internal
   */
  interface User {
    id?: string
    displayName?: string
    givenName?: string
    jobTitle?: string
    mail?: string
    mobilePhone?: string
    preferredLanguage?: string
    role?: any
    surname?: string
    subscription?: UserSubscription
    tokenParams?: any
  }
}
