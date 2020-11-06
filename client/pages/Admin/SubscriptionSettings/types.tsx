import { SubscriptionSettings } from 'types'

export type SubscriptionSetting =
    | {
        type: 'bool'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: SubscriptionSettings) => boolean
        hiddenIf?: (settings: SubscriptionSettings) => boolean
    }
    | {
        type: 'text'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: SubscriptionSettings) => boolean
        hiddenIf?: (settings: SubscriptionSettings) => boolean
    }
    | {
        type: 'number'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: SubscriptionSettings) => boolean
        hiddenIf?: (settings: SubscriptionSettings) => boolean
    }