/* eslint-disable unicorn/consistent-function-scoping */
import {
  AsyncValidatorFunction,
  ValidationResult,
  ValidatorFunction
} from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useCustomersContext } from '../context'

export const CUSTOMER_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9]{2,12}$)', 'gm')

/**
 * Returns an async validator function that checks if the provided key is
 * unique among the customers. It doesn't really need to be `async`, but it
 * is to demonstrate how to use async validators.
 *
 * @returns An async validator function that resolves with an error message and a warning type if the key is not unique, or null if it is unique.
 */
export function useValidateUniqueKeyFunction() {
  const context = useCustomersContext()
  const { t } = useTranslation()
  const ValidateUniqueKeyFunction: AsyncValidatorFunction = async (
    value: string
  ) => {
    return await new Promise((resolve) => {
      const customer = _.find(
        context.state.customers,
        ({ key }) => key === value
      )
      const result: ValidationResult = customer
        ? [t('customers.keyNotUniqueError', customer), 'error']
        : null
      resolve(result)
    })
  }
  ValidateUniqueKeyFunction.isAsync = true
  return ValidateUniqueKeyFunction
}

export function useValidateUniqueNameFunction() {
  const context = useCustomersContext()
  const { t } = useTranslation()
  const ValidateUniqueNameFunction: ValidatorFunction = (value: string) => {
    const customer = _.find(
      context.state.customers,
      ({ name }) => name === value
    )
    return customer
      ? [t('customers.nameNotUniqueError', { customer }), 'error']
      : null
  }
  return ValidateUniqueNameFunction
}
