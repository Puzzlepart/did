import { IFormControlProps, useFormControls } from 'components/FormControl'
import { ComponentLogicHook } from 'hooks'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectFormSubmit } from './useProjectFormSubmit'
import { useProjectModel } from './useProjectModel'

type UseProjectFormReturnType = {
  /**
   * The model for the form.
   */
  model: ReturnType<typeof useProjectModel>

  /**
   * Callback for registering form controls.
   */
  register: ReturnType<typeof useFormControls>

  /**
   * Props to pass to the `FormControl` component.
   */
  formControlProps: IFormControlProps
}

/**
 * @category Projects
 */
export const useProjectForm: ComponentLogicHook<
  IProjectFormProps,
  UseProjectFormReturnType
> = (props) => {
  const model = useProjectModel(props)
  const options = useProjectFormOptions()
  const register = useFormControls(model)
  const submitProps = useProjectFormSubmit(props, model, options)
  const formControlProps: IFormControlProps = {
    ...props,
    model,
    register,
    isEditMode: Boolean(props.edit),
    submitProps,
    additionalContext: new Map<string, any>([
      ['options', options],
      ['setOptions', (key: any, value: any) => options.set(key, value)]
    ])
  }

  return {
    model,
    register,
    formControlProps
  }
}
