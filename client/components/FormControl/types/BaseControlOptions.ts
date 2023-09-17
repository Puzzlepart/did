/**
 * Represents the possible validation states for a form control.
 */
export type ValidationState = 'error' | 'none' | 'warning' | 'success'

/**
 * Represents the result of a custom validator function.
 * The first element is an optional error message, and the second element is an optional validation state.
 */
export type ValidationResult = [string?, ValidationState?]

/**
 * Represents a function that can be used to validate a form control's value.
 * It takes the value as an argument and returns a CustomValidatorResult.
 */
type BaseValidatorFunction<T, V = any> = (value: V) => T

export interface ValidatorFunction<V = any>
  extends BaseValidatorFunction<ValidationResult, V> {
  isAsync?: false
}

export interface AsyncValidatorFunction<V = any>
  extends BaseValidatorFunction<Promise<ValidationResult>, V> {
  isAsync: true
}

/**
 * Represents an object that can be used to configure a form control's validation.
 * It can specify a minimum length, a regular expression, and a validation state.
 */
type ValidatorObject = {
  /**
   * The minimum length of the value.
   */
  minLength?: number

  /**
   * The regular expression to use to validate the value.
   */
  regex?: RegExp

  /**
   * The validation state to use for the control.
   */
  state?: ValidationState

  /**
   * Custom messages to display for e.g. `minLength` validation.
   * Otherwise the default messages will be used.
   */
  messages?: {
    minLength?: string
    regex?: string
  }
}

type ValidatorMessage = string

/**
 * Represents the options that can be passed to a form control.
 */
export type BaseControlOptions = {
  /**
   * A collection of validator functions and/or objects that can be used to validate the control's value.
   * If a function is provided, it should return a `CustomValidatorResult`.
   * If an object is provided, it can specify a minimum length, a regular expression, and a validation state.
   *
   * @param value The value to validate.
   */
  validators?:
    | (ValidatorFunction | AsyncValidatorFunction | ValidatorObject)[]
    | ValidatorMessage
}
