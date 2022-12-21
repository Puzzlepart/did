/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { CustomerModel } from './CustomerModel'
import { ICustomerFormProps } from './types'
import { useCustomerFormValidation } from './useCustomerFormValidation'
import { useInitModel } from './useInitModel'

/**
 * Returns the model and functions to update
 * the `key`, `name`, `description` and `icon`
 *
 * @param props - Props
 *
 * @returns the initial model
 */
export function useCustomerModel(props: ICustomerFormProps) {
  const map = useMap<keyof CustomerModel, CustomerModel>()
  const valid = useCustomerFormValidation(map.$)

  useInitModel(map, props)

  return {
    ...map,
    valid
  }
}
