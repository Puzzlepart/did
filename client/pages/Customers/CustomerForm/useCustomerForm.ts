import { ICustomerFormProps } from './types'
import { useCustomerFormSubmit } from './useCustomerFormSubmit'
import { useCustomerModel } from './useCustomerModel'

/**
 * Component logic hook for `<CustomerForm />`
 *
 * @param props - Props
 * @returns `model` and `submit`
 */
export function useCustomerForm(props: ICustomerFormProps) {
  const model = useCustomerModel(props)
  const submit = useCustomerFormSubmit(props, model)
  return {
    model,
    submit
  }
}
