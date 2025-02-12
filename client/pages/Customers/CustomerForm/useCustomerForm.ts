import { IFormControlProps, useFormControlModel, useFormControls } from 'components/FormControl'
import { Customer } from 'types'
import { mapProperty } from 'utils'
import { ICustomerFormProps } from './types'
import { useCustomerFormSubmit } from './useCustomerFormSubmit'
import { CustomerForm } from './CustomerForm'

/**
 * Component logic hook for `<CustomerForm />`
 *
 * @param props - Props
 * @returns `model` and `submit`
 */
export function useCustomerForm(props: ICustomerFormProps) {
  const model = useFormControlModel<keyof Customer, Customer>(
    props.edit,
    (p) => ({
      ...p,
      labels: mapProperty<any, string>(p.labels, 'name')
    })
  )
  const submit = useCustomerFormSubmit(props, model)
  const register = useFormControls(model, CustomerForm.displayName)
  const formControl: IFormControlProps = {
    ...props,
    id: CustomerForm.displayName,
    model,
    register,
    submitProps: submit,
    validateOnBlur: true
  }
  return { formControl }
}
