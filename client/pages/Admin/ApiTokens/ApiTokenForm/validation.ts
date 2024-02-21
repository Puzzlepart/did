/* eslint-disable unicorn/consistent-function-scoping */
import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import _ from 'underscore'
import { IApiTokenFormProps } from './types'

/**
 * Returns a validator function that checks if the given value is a unique name among the provided ApiTokens.
 *
 * @param tokens An array of ApiTokens to check against.
 *
 * @returns A ValidatorFunction that returns an error message and 'error' status if the name is not unique, or null if it is unique.
 */
export function useValidateUniqueNameFunction(tokens: ApiToken[]) {
  const { t } = useTranslation()
  const ValidateUniqueNameFunction: ValidatorFunction<string> = (value) => {
    const existingToken = _.find(tokens, ({ name }) => name === value)
    return existingToken
      ? [t('customers.nameNotUniqueError', existingToken), 'error']
      : null
  }
  return ValidateUniqueNameFunction
}

/**
 * Returns a validator function that checks if the given value is an array of permissions.
 * If the value is an empty array or null, it returns an error message.
 *
 * @returns A validator function that takes a string array as input and returns
 * an error message if the input is invalid, otherwise null.
 */
export function useValidatePermissionsFunction() {
  const { t } = useTranslation()
  const ValidatePermissionsFunction: ValidatorFunction<string[]> = (value) => {
    if (value?.length === 0 || value === null)
      return [t('admin.apiTokens.permissionsRequired'), 'error']
    else if (value?.length > 5) {
      return [
        t('admin.apiTokens.warningTooManyPermissions', {
          count: value?.length
        }),
        'warning'
      ]
    }
    return null
  }
  return ValidatePermissionsFunction
}

export default function useApiTokenFormValidation(props: IApiTokenFormProps) {
  const ValidateUniqueNameFunction = useValidateUniqueNameFunction(props.tokens)
  const ValidatePermissionsFunction = useValidatePermissionsFunction()
  return {
    ValidateUniqueNameFunction,
    ValidatePermissionsFunction
  }
}
