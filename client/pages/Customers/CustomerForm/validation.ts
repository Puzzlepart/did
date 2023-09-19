/* eslint-disable unicorn/consistent-function-scoping */
import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useCustomersContext } from '../context'
import { ICustomerFormProps } from './types'

export const CUSTOMER_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9]{2,12}$)', 'gm')

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
  const ValidateUniqueKeyFunction: ValidatorFunction<string> = (
    value,
    field
  ) => {
    if (!field.required) return null
    const customer = _.find(context.state.customers, ({ key }) => key === value)
    if (!customer) return null
    return [t('customers.keyNotUniqueError', customer), 'error']
  }
  return ValidateUniqueKeyFunction
}

/**
 * Returns a validator function that checks if the provided customer `name` is unique.
 *
 * @param props - The props object containing the customer form data.
 *
 * @returns A validator function that takes a string value and a field object,
 * and returns an error message if the `name` is not unique, or null if it is.
 */
export function useValidateUniqueNameFunction(props: ICustomerFormProps) {
  const context = useCustomersContext()
  const { t } = useTranslation()
  const ValidateUniqueNameFunction: ValidatorFunction<string> = (
    value,
    field
  ) => {
    const customer = _.find(
      context.state.customers,
      ({ name }) => name === value
    )
    if (!customer) return null
    if (!!props.edit && customer.key === field.model.value('key')) return null
    else [t('customers.nameNotUniqueError', { customer }), 'error']
  }
  return ValidateUniqueNameFunction
}
