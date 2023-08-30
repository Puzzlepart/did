import { TextareaProps } from '@fluentui/react-components'
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

export interface ITextFieldProps extends TextareaProps {
  /**
   * Label for the control
   */
  label?: string

  /**
   * Description for the control
   */
  description?: string
}

export interface ITextControlProps
  extends FormInputControlBase<TextControlOptions>,
    Omit<ITextFieldProps, 'name' | 'value' | 'onChange'> {}
