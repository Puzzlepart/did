import { TextareaProps } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
import { FormInputControlBase } from '../types'

export type TextControlOptions = {
  /**
   * Force value casing
   */
  casing?: 'upper' | 'lower' | 'capitalized'

  /**
   * Regex replacer
   */
  replace?: [RegExp, string]
}

export interface ITextFieldProps extends Omit<TextareaProps, 'onChange'> {
  /**
   * Label for the control
   */
  label?: string

  /**
   * Description for the control
   */
  description?: string

  /**
   * On change event handler
   */
  onChange?: (event: ChangeEvent<any>, data: any) => void
}

export interface ITextControlProps
  extends FormInputControlBase<TextControlOptions>,
    Omit<ITextFieldProps, 'name' | 'value' | 'onChange'> {}
