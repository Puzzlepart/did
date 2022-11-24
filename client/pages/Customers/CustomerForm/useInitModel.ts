/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { useRandomFabricIcon } from 'hooks/common/useRandomFabricIcon'
import { useEffect } from 'react'
import { toMap } from 'utils/toMap'
import { CustomerModel } from './CustomerModel'
import { ICustomerFormProps } from './types'

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
  const randomFabricIcon = useRandomFabricIcon()

  useEffect(() => {
    const model = new CustomerModel().init(props.edit)
    const _map = toMap(model)
    map.$set(_map)
    if (!props.edit) map.set('icon', randomFabricIcon)
  }, [props.edit])
}
