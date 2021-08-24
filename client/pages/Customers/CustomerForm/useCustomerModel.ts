/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { useRandomFabricIcon } from 'hooks/common/useRandomFabricIcon'
import { useEffect } from 'react'
import { toMap } from 'utils/toMap'
import { CustomerModel } from './CustomerModel'
import { ICustomerFormProps } from './types'
import { useCustomerFormValidation } from './useCustomerFormValidation'

/**
 * Initializes the model based on `props.edit`. Sets a random
 * fabric icon using hook `useRandomFabricIcon`.
 *
 * @param map - Map
 * @param props - Props
 */
export function useInitModel(
  map: ReturnType<typeof useMap>,
  props: ICustomerFormProps
): void {
  const icon = useRandomFabricIcon()
  useEffect(() => {
    const model = new CustomerModel().init(props.edit)
    const _map = toMap(model)
    map.$set(_map)
    map.set('icon', icon)
  }, [props.edit])
}

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
