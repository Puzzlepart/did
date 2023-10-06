import { BaseControlOptions, FormInputControlBase } from '../types'
import { IInputFieldProps } from './InputField'

export interface InputControlOptions extends BaseControlOptions {
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
  extends FormInputControlBase<InputControlOptions>,
    Pick<
      IInputFieldProps,
      | 'rows'
      | 'placeholder'
      | 'maxLength'
      | 'type'
      | 'contentBefore'
      | 'contentAfter'
    > {}
