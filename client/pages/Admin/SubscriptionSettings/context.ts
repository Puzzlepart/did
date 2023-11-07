import { createContext } from 'react'
import { SubscriptionSettings } from 'types'

export interface ISubscriptionContext {
  /**
   * The subscription settings.
   */
  settings: SubscriptionSettings

  /**
   * A callback function to be called when a setting is changed. The key is a
   * `string` while the value can be a `boolean`, `string`, or a function that
   * takes the current value and returns a new value.
   */
  onChange?: (
    key: string,
    value: boolean | string | ((value: any) => any)
  ) => void
}

export const SubscriptionContext = createContext<ISubscriptionContext>(null)
