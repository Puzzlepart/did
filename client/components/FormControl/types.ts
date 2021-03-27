import { IButtonProps, IPanelProps } from '@fluentui/react'
import { IToastProps } from 'components/Toast'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'



export type UseFormOptions = {
  /**
   * Validator 
   */
  validator: (model: Record<string, any>) => boolean

  /**
   * Intial model
   */
  intitialModel?: any;

  /**
   * The mutation to use when submitting
   * the form
   */
  mutation: any

  /**
   * Function to generate the variables
   * based on the model
   */
  variables: ($: Record<string, any>) => Record<string, any>

  successMessage?: string

  errorMessage?: string
}

export interface ISubmitProps extends IButtonProps  {
  toast?: IToastProps
}

export interface IFormControlPanelProps extends IPanelProps {
  onSave: () => void
}

export interface IFormControlBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
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
  edit?: any;
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