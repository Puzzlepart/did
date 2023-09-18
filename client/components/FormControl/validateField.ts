/* eslint-disable unicorn/no-for-loop */
/* eslint-disable unicorn/prefer-ternary */
import { TFunction } from 'react-i18next'
import _ from 'underscore'
import {
  FormInputControlBase,
  ValidationResult,
  ValidatorFunction
} from './types'

/**
 * Validates a form input control field using the provided validators.
 *
 * @param field - The form input control field to validate.
 * @param t - The translation function to use for error messages.
 *
 * @returns A promise that resolves to a ValidationResult array, or null if the field is valid.
 */
export async function validateField(
  field: FormInputControlBase,
  t: TFunction
): Promise<ValidationResult> {
  const currentValue = field.model.value(field.name, null)
  const validators = field.options?.validators
  if (
    field.required &&
    (currentValue === undefined || currentValue === null || currentValue === '')
  ) {
    let message = t('formControl.requiredFieldMessage', field)
    if (typeof validators === 'string') {
      message = validators
    }
    return [message, 'error']
  } else if (!_.isEmpty(validators)) {
    for (let index = 0; index < validators.length; index++) {
      const validator = validators[index]
      let customValidatorResult: ValidationResult
      if (typeof validator === 'function') {
        if (validator.isAsync) {
          customValidatorResult = await validator(currentValue, field)
        } else {
          customValidatorResult = (validator as ValidatorFunction)(
            currentValue,
            field
          )
        }
      } else if (typeof validator === 'object') {
        if (validator.minLength && currentValue?.length < validator.minLength) {
          const message =
            validator.messages?.minLength ??
            t('formControl.minLengthMessage', { ...field, validator })
          customValidatorResult = [message, validator.state ?? 'error']
        } else if (validator.regex && !validator.regex.test(currentValue)) {
          const message =
            validator.messages?.regex ?? t('formControl.regexMessage', field)
          customValidatorResult = [message, validator.state ?? 'error']
        }
      }
      if (customValidatorResult) {
        return customValidatorResult
      }
    }
    return null
  }
}
