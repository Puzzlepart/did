import { ValidationResult } from './BaseControlOptions'

export interface IFormControlState {
  /**
   * The validation messages for the form control.
   */
  validationMessages: Map<string, ValidationResult>
}
