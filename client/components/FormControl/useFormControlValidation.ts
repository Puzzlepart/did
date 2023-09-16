/* eslint-disable unicorn/no-lonely-if */
import { useMap } from 'hooks'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { FormInputControlBase, ValidationResult } from './types'

/**
 * Determines whether a given form input control should be validated.
 * A control should be validated if it has a name and either a required flag or a validator function.
 *
 * @param field - The form input control to check.
 *
 * @returns True if the control should be validated, false otherwise.
 */
function shouldValidateField(field: FormInputControlBase) {
  return !!field.name && (field.required || field.options?.validator)
}

/**
 * A hook that provides form control validation functionality. Checks all fields
 * for either a `required` attribute or a `validator` attribute. If a field has
 * a `required` attribute, it will be checked for a value. If a field has a
 * `validator` attribute, it will be checked using the provided validator
 * function or object.
 *
 * @returns An object containing the `validateForm` function and an `validationMessages` map.
 */
export function useFormControlValidation() {
  const { t } = useTranslation()
  const validationMessages = useMap<string, Record<string, ValidationResult>>()
  const validateForm = useCallback((fields: ReactElement[]) => {
    const formFieldsToValidate = fields
      .filter((f) => shouldValidateField(f.props))
      .map<FormInputControlBase>((f) => f.props)
    const _validationMessages = formFieldsToValidate.reduce((map, field) => {
      const currentValue = field.model.value(field.name, null)
      if (
        field.required &&
        (currentValue === undefined ||
          currentValue === null ||
          currentValue === '')
      ) {
        let message = t('formControl.requiredFieldMessage', field)
        if (typeof field.options?.validator === 'string') {
          message = field.options.validator
        }
        map.set(field.name, [message, 'error'])
      } else if (field.options?.validator) {
        let customValidatorResult: ValidationResult
        if (typeof field.options.validator === 'function') {
          customValidatorResult = field.options.validator(currentValue)
        } else if (typeof field.options.validator === 'object') {
          if (
            field.options.validator.minLength &&
            currentValue?.length < field.options.validator.minLength
          ) {
            const message =
              field.options?.validator?.messages?.minLength ??
              t('formControl.minLengthMessage', field)
            customValidatorResult = [
              message,
              field.options.validator.state ?? 'error'
            ]
          }
        }
        if (customValidatorResult) {
          map.set(field.name, customValidatorResult)
        }
      }
      return map
    }, new Map<string, ValidationResult>())
    validationMessages.$set(_validationMessages)
    return !Array.from(_validationMessages.values()).some(
      ([, state]) => state === 'error'
    )
  }, [])
  return { validateForm, validationMessages }
}
