/* eslint-disable unicorn/no-lonely-if */
import { useMap } from 'hooks'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { FormInputControlBase, ValidationResult } from './types'

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
    const _validationMessages = new Map<string, ValidationResult>()
    const requiredFormFields = fields
      .filter(
        ({ props }: any) =>
          !!props['name'] && (props['required'] || props.options?.validator)
      )
      .map<FormInputControlBase>((f) => f.props)
    for (const field of requiredFormFields) {
      const currentValue = field.model.value(field.name, null)
      if (
        field.required &&
        (currentValue === undefined ||
          currentValue === null ||
          currentValue === '')
      ) {
        _validationMessages.set(field.name, [
          t('formControl.requiredFieldMessage', field),
          'error'
        ])
      } else if (field.options?.validator) {
        let customValidatorResult: ValidationResult
        if (typeof field.options.validator === 'function') {
          customValidatorResult = field.options.validator(currentValue)
        } else {
          if (
            field.options.validator.minLength &&
            currentValue.length < field.options.validator.minLength
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
          _validationMessages.set(field.name, customValidatorResult)
        }
      }
    }
    validationMessages.$set(_validationMessages)
    return !Array.from(_validationMessages.values()).some(
      ([, state]) => state === 'error'
    )
  }, [])
  return { validateForm, validationMessages }
}
