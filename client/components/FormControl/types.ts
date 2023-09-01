import { ButtonProps } from '@fluentui/react-components'
import { IBasePanelProps } from 'components/BasePanel/types'
import { IToastProps } from 'components/Toast'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'

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

export interface ISubmitProps
  extends Pick<ButtonProps, 'onClick' | 'disabled'> {
  text: string
  toast?: IToastProps
}

export interface IFormControlPanelProps extends IBasePanelProps {
  onSave?: () => void
}

export interface IFormControlBaseProps
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

export type IFormControlProps = IFormControlBaseProps

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
