declare namespace Express {
  interface UserSubscription {
    id: string
    connectionString: string
    name: string
    settings: any
  }

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
