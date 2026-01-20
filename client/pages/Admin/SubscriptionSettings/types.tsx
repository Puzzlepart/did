import { CheckboxProps, SliderProps } from '@fluentui/react-components'
import { IInputFieldProps } from 'components/FormControl/InputControl'
import React from 'react'
import { IImageFieldProps } from './SettingsSection/ImageField'
import { SubscriptionSettings } from 'types'

interface ISubscriptionSettingBase<T = any> {
  /**
   * The ID of the setting
   */
  id: string

  /**
   * Optional override for the settings key path.
   * Defaults to `${sectionId}.${id}` when not provided.
   */
  settingsKey?: string

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

export interface ISubscriptionSettingText<T = IInputFieldProps>
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

  /**
   * Display add button with the specified text
   */
  addButtonText?: string

  /**
   * The (warning) message to display when an item is already added
   */
  itemAlreadyAddedMessage?: string
}

export interface ISubscriptionSettingCustom<T = any>
  extends ISubscriptionSettingBase<T> {
  type: 'custom'

  /**
   * The custom component to render
   */
  component: React.ComponentType<any>
}

export type SubscriptionSettingField<T = any> =
  | ISubscriptionSettingText<T>
  | ISubscriptionSettingBool<T>
  | ISubscriptionSettingNumber<T>
  | ISubscriptionSettingCheckboxMulti<T>
  | ISubscriptionSettingImage
  | ISubscriptionSettingList
  | ISubscriptionSettingCustom
