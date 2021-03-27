/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { useMemo } from 'react'
import { Customer } from 'types'
import { keys, pick } from 'underscore'
import { CustomerModel, ICustomerFormProps, _CustomerModel } from './types'
import { useCustomerFormValidation } from './useCustomerFormValidation'

/**
 * Returns the initial model based on `edit`
 * from `props`
 *
 * @param edit - Customer
 *
 * @returns the initial model
 */
export function useInitialModel(edit: Customer): Map<any, any> {
  return useMemo(() => {
    const model = edit || _CustomerModel
    return new Map(Object.entries(pick(model, keys(_CustomerModel))))
  }, [edit])
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
  const _model = useInitialModel(props.edit)
  const map = useMap<keyof CustomerModel>(_model)
  const valid = useCustomerFormValidation(map.$)
  return {
    ...map,
    valid
  }
}
