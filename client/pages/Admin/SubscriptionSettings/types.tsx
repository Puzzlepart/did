import { ITextFieldProps } from '@fluentui/react'
import { CheckboxProps, SliderProps } from '@fluentui/react-components'

interface ISubscriptionSettingBase<T = any> {
  id: string
  disabledIf?: (settings: any) => boolean
  hiddenIf?: (settings: any) => boolean
  props: T
}

export interface ISubscriptionSettingText<T = ITextFieldProps>
  extends ISubscriptionSettingBase<T> {
  type: 'text'
}

export interface ISubscriptionSettingBool<T = CheckboxProps>
  extends ISubscriptionSettingBase<T> {
  type: 'bool'
}

export interface ISubscriptionSettingNumber<T = SliderProps>
  extends ISubscriptionSettingBase<T> {
  type: 'number'
}

export interface ISubscriptionSettingCheckboxMulti<T = any>
  extends ISubscriptionSettingBase<T> {
  id: string
  type: 'checkboxmulti'
  options: Record<string, string>
}

export type SubscriptionSettingField<T = any> =
  | ISubscriptionSettingText<T>
  | ISubscriptionSettingBool<T>
  | ISubscriptionSettingNumber<T>
  | ISubscriptionSettingCheckboxMulti<T>
