import { TextareaProps } from '@fluentui/react-components'
import { ChangeEvent } from 'react'
import { IFieldProps } from '../Field'

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

export interface ITextFieldProps extends Pick<TextareaProps, 'rows' | 'value'>, IFieldProps {
  /**
   * On change event handler
   */
  onChange?: (event: ChangeEvent<any>, data: any) => void
}