export type SubscriptionSettingField =
    | {
        type: 'bool'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: any) => boolean
        hiddenIf?: (settings: any) => boolean
    }
    | {
        type: 'text'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: any) => boolean
        hiddenIf?: (settings: any) => boolean
    }
    | {
        type: 'number'
        key: string
        props: Map<string, any>
        disabledIf?: (settings: any) => boolean
        hiddenIf?:(settings: any) => boolean
    }