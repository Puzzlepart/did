export type SubscriptionSettingField =
  {
    type: 'bool'
    id: string
    props: Map<string, any>
    disabledIf?: (settings: any) => boolean
    hiddenIf?: (settings: any) => boolean
  }
  |
  {
    type: 'text'
    id: string
    props: Map<string, any>
    disabledIf?: (settings: any) => boolean
    hiddenIf?: (settings: any) => boolean
  }
  |
  {
    type: 'number'
    id: string
    props: Map<string, any>
    disabledIf?: (settings: any) => boolean
    hiddenIf?: (settings: any) => boolean
  }
  |
  {
    type: 'checkbox'
    id: string
    options: Record<string, string>
    props: Map<string, any>
    disabledIf?: (settings: any) => boolean
    hiddenIf?: (settings: any) => boolean
  }
