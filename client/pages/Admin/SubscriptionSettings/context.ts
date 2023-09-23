import { createContext } from 'react'
import { SubscriptionSettings } from 'types'

export interface ISubscriptionContext {
  /**
   * The subscription settings.
   */
  settings: SubscriptionSettings

  /***
   * A callback function to be called when a setting is changed.
   */
  onChange?: (key: string, value: any) => void
}

export const SubscriptionContext = createContext<ISubscriptionContext>(null)
