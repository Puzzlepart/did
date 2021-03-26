/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'
import { CustomerModel, ICustomerFormProps, _CustomerModel } from './types'
import { useCustomerFormValidation } from './useCustomerFormValidation'

/**
 * Returns the initial model based on `props`
 *
 * @param props - Props
 *
 * @returns the initial model
 */
export function useInitialModel(props: ICustomerFormProps): CustomerModel {
  return useMemo(() => {
    if (props.edit) _CustomerModel.init(props.edit)
    return new CustomerModel()
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
  const _model = useInitialModel(props)
  const [model, setModel] = useState<CustomerModel>(_model)
  const reset = () => setModel(new CustomerModel())
  const setKey = (key: string) => setModel({ ...model, key: key.toUpperCase() })
  const setName = (name: string) => setModel({ ...model, name })
  const setDescription = (description: string) =>
    setModel({ ...model, description })
  const setIcon = (icon: string) => setModel({ ...model, icon })

  const valid = useCustomerFormValidation(model)
  return {
    ...model,
    $: model,
    reset,
    setKey,
    setName,
    setDescription,
    setIcon,
    valid
  }
}
