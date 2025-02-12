/* eslint-disable unicorn/no-for-loop */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable unicorn/no-lonely-if */
import { AnyAction } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'
import { SET_VALIDATION_MESSAGES } from './reducer'
import {
  FormInputControlBase,
  IFormControlProps,
  ValidationResult
} from './types'
import { validateField } from './validateField'

/**
 * Determines whether a given form input control should be validated.
 * A control should be validated if it has a name and either a required flag or a validator function.
 *
 * @param field - The form input control to check.
 *
 * @returns True if the control should be validated, false otherwise.
 */
function shouldValidateField(field: FormInputControlBase) {
  if (!field) return false
  return (
    Boolean(field.name) &&
    (field.required || Boolean(field.options?.validators))
  )
}

/**
 * A hook that provides form control validation functionality. Checks all fields
 * for either a `required` attribute or a `validator` attribute. If a field has
 * a `required` attribute, it will be checked for a value. If a field has a
 * `validator` attribute, it will be checked using the provided validator
 * function or object.
 *
 * @param props - The props from the `FormControl` component.
 * @param dispatch - The Redux dispatch function to dispatch actions to the form control reducer.
 */
export function useFormControlValidation(
  props: IFormControlProps,
  dispatch: React.Dispatch<AnyAction>
) {
  const { t } = useTranslation()
  const validateForm = async (fields: FormInputControlBase[]) => {
    if (props.skipValidation) return true
    const formFieldsToValidate = fields
      .filter(Boolean)
      .filter((f) => shouldValidateField(f))
    const _validationMessages = new Map<string, ValidationResult>()
    for (const field of formFieldsToValidate) {
      if (_validationMessages.has(field.name)) {
        continue
      }
      const validationResult = await validateField(field, props, t)
      if (validationResult) {
        _validationMessages.set(field.name, validationResult)
      }
    }
    dispatch(SET_VALIDATION_MESSAGES(_validationMessages))
    return !Array.from(_validationMessages.values()).some(
      ([, state]) => state === 'error'
    )
  }
  return validateForm
}
