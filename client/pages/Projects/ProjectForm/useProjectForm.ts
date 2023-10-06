import { IFormControlProps, useFormControls } from 'components/FormControl'
import { ComponentLogicHook } from 'hooks'
import { useCustomersContext } from 'pages/Customers/context'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectFormSubmit } from './useProjectFormSubmit'
import { useProjectModel } from './useProjectModel'

/**
 * @category Projects
 */
export const useProjectForm: ComponentLogicHook<
  IProjectFormProps,
  {
    /**
     * The model for the form.
     */
    model: ReturnType<typeof useProjectModel>

    /**
     * Options for the form.
     */
    options: ReturnType<typeof useProjectFormOptions>

    /**
     * Callback for registering form controls.
     */
    register: ReturnType<typeof useFormControls>

    /**
     * Props to pass to the `FormControl` component.
     */
    formControlProps: IFormControlProps

    /**
     * If the customer context is available, then the form is being
     * used in the context of a customer. This means that the customer
     * key is already known and should not be editable.
     */
    isCustomerContext: boolean
  }
> = (props) => {
  const model = useProjectModel(props)
  const options = useProjectFormOptions()
  const register = useFormControls(model)
  const submitProps = useProjectFormSubmit(props, model, options)
  const formControlProps: IFormControlProps = {
    ...props,
    model,
    submitProps
  }
  const customerContext = useCustomersContext()
  const isCustomerContext = !!customerContext

  return {
    model,
    options,
    register,
    formControlProps,
    isCustomerContext
  }
}
