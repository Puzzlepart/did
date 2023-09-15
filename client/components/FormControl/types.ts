/* eslint-disable @typescript-eslint/ban-types */
import { ButtonProps } from '@fluentui/react-components'
import { IBasePanelProps } from 'components/BasePanel/types'
import { IToastProps } from 'components/Toast'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'
import { StyledComponent } from 'types'

export type UseFormOptions = {
  /**
   * Validator function to use when submitting.
   */
  validator: (model: Record<string, any>) => boolean

  /**
   * The mutation to use when submitting
   * the form.
   */
  mutation: any

  /**
   * Function to generate the variables
   * based on the model.
   */
  variables: ($: Record<string, any>) => Record<string, any>

  /**
   * Message to show on success.
   */
  successMessage?: string

  /**
   * Message to show on error.
   */
  errorMessage?: string
}

interface ISubmitProps extends Pick<ButtonProps, 'onClick' | 'disabled'> {
  text: string
  toast?: IToastProps
}

export interface IFormControlPanelProps extends IBasePanelProps {
  onSave?: () => void
}

export interface IFormControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /**
   * Specify the model used for the form control.
   */
  model?: ReturnType<typeof useMap>

  /**
   * Submit  props
   */
  submitProps?: ISubmitProps

  /**
   * Specify panel props to open the form control in
   * a `<Panel />`
   */
  panelProps?: IFormControlPanelProps

  /**
   * Model to be edited
   */
  edit?: any
}

export type FormInputControlBase<O = any> = {
  /**
   * The `name` attribute is required
   */
  name?: string

  /**
   * Automatically bind the text control to
   * a model. A model is generated using the
   * `useMap` hook.
   */
  model?: ReturnType<typeof useMap>

  /**
   * Control options
   *
   * - `casing` - force value casing
   */
  options?: O
}

export type FormSubmitHook<TProps = {}, TModel = {}, TOptions = {}> = (
  props?: TProps,
  model?: TModel,
  options?: TOptions
) => ISubmitProps

export type FormInputControlComponent<T = any> = StyledComponent<T>
