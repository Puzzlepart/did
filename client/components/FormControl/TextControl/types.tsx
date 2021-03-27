import { ITextFieldProps } from '@fluentui/react'
import { FormInputControlBase } from '../types'

export type TextControlOptions = {
  /**
   * Force value casing
   */
  casing?: 'upper' | 'lower' | 'capitalized'
}

export interface ITextControlProps
  extends FormInputControlBase<TextControlOptions>,
    Omit<ITextFieldProps, 'name' | 'value' | 'onChange'> {}
