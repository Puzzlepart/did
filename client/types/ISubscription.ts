export interface ISubscriptionSettings {
  forecast?: {
    enabled: boolean
    notifications?: number
  }
}

export interface ISubscription {
  id: string;
  name: string
  settings: ISubscriptionSettings
}
