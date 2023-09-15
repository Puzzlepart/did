import { FormInputControlBase } from '../types'
import { IInputFieldProps } from './InputField'

export type InputControlOptions = {
  /**
   * Force value casing
   */
  casing?: 'upper' | 'lower' | 'capitalized'

  /**
   * Regex replacer
   */
  replace?: [RegExp, string]
}

export interface IInputControlProps
  extends FormInputControlBase,
    Pick<IInputFieldProps, 'rows' | 'placeholder' | 'maxLength' | 'type'> {}
