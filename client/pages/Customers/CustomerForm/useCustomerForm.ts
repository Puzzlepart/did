import {
  IFormControlProps,
  useFormControlModel,
  useFormControls
} from 'components/FormControl'
import { Customer } from 'types'
import { mapProperty } from 'utils'
import { ICustomerFormProps } from './types'
import { useCustomerFormSubmit } from './useCustomerFormSubmit'
import { CustomerForm } from './CustomerForm'
import { ComponentLogicHook } from 'hooks'

/**
 * Component logic hook for `<CustomerForm />`
 *
 * @param props - Props
 * @returns `model` and `submit`
 */
export const useCustomerForm: ComponentLogicHook<
  ICustomerFormProps,
  { formControlProps: IFormControlProps }
> = (props) => {
  const model = useFormControlModel<keyof Customer, Customer>(
    props.edit,
    (p) => ({
      ...p,
      labels: mapProperty<any, string[]>(p.labels, 'name')
    })
  )
  const submit = useCustomerFormSubmit(props, model)
  const register = useFormControls(model, CustomerForm)
  const formControlProps: IFormControlProps = {
    ...props,
    id: CustomerForm.displayName,
    model,
    register,
    submitProps: submit,
    isEditMode: Boolean(props.edit),
    validateOnBlur: true
  }
  return { formControlProps }
}
