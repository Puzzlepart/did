import { TextareaProps } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
import { IFieldProps } from '../Field'
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

export interface ITextFieldProps
  extends Pick<TextareaProps, 'rows' | 'value' | 'placeholder' | 'maxLength'>,
    IFieldProps {
  /**
   * On change event handler
   */
  onChange?: (event: ChangeEvent<any>, data: any) => void
}

export interface ITextControlProps
  extends FormInputControlBase,
    Pick<ITextFieldProps, 'rows' | 'placeholder' | 'maxLength'> {}
