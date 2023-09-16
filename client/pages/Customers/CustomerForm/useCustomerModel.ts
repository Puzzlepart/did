import { useMap } from 'hooks/common/useMap'
import { CustomerModel } from './CustomerModel'
import { ICustomerFormProps } from './types'
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

  useInitModel(map, props)

  return map
}
