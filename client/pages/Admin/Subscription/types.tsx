interface ISubscriptionSettingBase {
  id: string
  disabledIf?: (settings: any) => boolean
  hiddenIf?: (settings: any) => boolean
  props: { [key: string]: any }
}

export interface ISubscriptionSettingBool extends ISubscriptionSettingBase {
  type: 'bool'
}

export interface ISubscriptionSettingNumber extends ISubscriptionSettingBase {
  type: 'number'
}

export interface ISubscriptionSettingCheckbox extends ISubscriptionSettingBase {
  id: string
  type: 'checkbox'
  options: Record<string, string>
}

export type SubscriptionSettingField =
  | ISubscriptionSettingBool
  | ISubscriptionSettingNumber
  | ISubscriptionSettingCheckbox
