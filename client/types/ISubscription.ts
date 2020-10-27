export interface ISubscription {
  name: string
  settings: {
    forecastEnabled: boolean
    forecastNotifications: number
  }
}
