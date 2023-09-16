import { useFormControlModel, useFormControls } from 'components/FormControl'
import { Customer } from 'types'
import { ICustomerFormProps } from './types'
import { useCustomerFormSubmit } from './useCustomerFormSubmit'

/**
 * Component logic hook for `<CustomerForm />`
 *
 * @param props - Props
 * @returns `model` and `submit`
 */
export function useCustomerForm(props: ICustomerFormProps) {
  const model = useFormControlModel<keyof Customer, Customer>(props.edit)
  const submit = useCustomerFormSubmit(props, model)
  const register = useFormControls(model)
  return {
    model,
    submit,
    register
  }
}
