import { ITextFieldProps } from '@fluentui/react'
import { CheckboxProps, SliderProps } from '@fluentui/react-components'
import { IImageFieldProps } from './SettingsSection/ImageField'
import { SubscriptionSettings } from 'types'

interface ISubscriptionSettingBase<T = any> {
  /**
   * The ID of the setting
   */
  id: string

  /**
   * Conditionally disable the setting based on the current settings
   *
   * @param settings The current settings
   */
  disabledIf?: (settings: SubscriptionSettings) => boolean

  /**
   * Conditionally hide the setting based on the current settings
   *
   * @param settings The current settings
   */
  hiddenIf?: (settings: SubscriptionSettings) => boolean

  /**
   * The props to pass to the field component
   */
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

  /**
   * The options to display
   */
  options: Record<string, string>
}

export interface ISubscriptionSettingImage<T = IImageFieldProps>
  extends ISubscriptionSettingBase<T> {
  type: 'image'
}

export interface ISubscriptionSettingList<T = any>
  extends ISubscriptionSettingBase<T> {
  type: 'list'

  /**
   * The message to display when an item is added
   */
  onAddMessage?: string

  /**
   * The message to display when an item is removed
   */
  onRemoveMessage?: string
}

export type SubscriptionSettingField<T = any> =
  | ISubscriptionSettingText<T>
  | ISubscriptionSettingBool<T>
  | ISubscriptionSettingNumber<T>
  | ISubscriptionSettingCheckboxMulti<T>
  | ISubscriptionSettingImage
  | ISubscriptionSettingList
