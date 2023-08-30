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

export interface ITextControlProps
  extends FormInputControlBase<TextControlOptions>,
  Omit<TextareaProps, 'name' | 'value' | 'onChange'> {
  label?: string
  description?: string
}
