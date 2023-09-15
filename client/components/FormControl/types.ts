/* eslint-disable @typescript-eslint/ban-types */
import { ButtonProps } from '@fluentui/react-components'
import { IBasePanelProps } from 'components/BasePanel/types'
import { IToastProps } from 'components/Toast'
import { useMap } from 'hooks/common/useMap'
import { HTMLAttributes } from 'react'
import { StyledComponent } from 'types'
import { IFieldProps } from './Field'

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

  /**
   * Running in debug mode will show the model JSON in the bottom of the form.
   */
  debug?: boolean
}

export interface FormInputControlBase<TOptions = any, KeyType = string>
  extends IFieldProps {
  /**
   * The `name` attribute is required
   */
  name?: KeyType

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
  options?: TOptions
}

export type FormSubmitHook<TProps = {}, TModel = {}, TOptions = {}> = (
  props?: TProps,
  model?: TModel,
  options?: TOptions
) => ISubmitProps

/**
 * A styled component that represents a form input control.
 *
 * @template T - The type of props that this component accepts.
 */
export type FormInputControlComponent<
  T extends FormInputControlBase = FormInputControlBase
> = StyledComponent<T>
