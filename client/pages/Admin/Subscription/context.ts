import { createContext } from 'react'

export interface ISubscriptionContext  {
    onSettingsChanged?: (key: string, value: any) => void
}

export const SubscriptionContext = createContext<ISubscriptionContext>(null)
