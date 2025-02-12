/* eslint-disable unicorn/consistent-function-scoping */
import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useCustomersContext } from '../../../context'
import { useCallback } from 'react'

/**
 * Returns an validator function that checks if the provided `key` is
 * unique among the customers.
 *
 * @returns An validator function that resolves with an error message
 * if the key is not unique, or null if it is unique.
 */
export function useValidateUniqueKeyFunction() {
  const context = useCustomersContext()
  const { t } = useTranslation()
  const ValidateUniqueKeyFunction: ValidatorFunction<string> = useCallback(
    (value, field) => {
      if (!field.required) return null
      const customer = _.find(
        context.state.customers,
        ({ key }) => key === value
      )
      if (!customer) return null
      return [t('customers.keyNotUniqueError', customer), 'error']
    },
    [context, t]
  )
  return ValidateUniqueKeyFunction
}
