import { IFormControlProps, useFormControls } from 'components/FormControl'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectFormSubmit } from './useProjectFormSubmit'
import { useProjectModel } from './useProjectModel'

/**
 * @category Projects
 */
export function useProjectForm(props: IProjectFormProps) {
  const model = useProjectModel(props)
  const options = useProjectFormOptions()
  const register = useFormControls(model)
  const submitProps = useProjectFormSubmit(props, model, options)
  const formControlProps: IFormControlProps = {
    ...props,
    model,
    submitProps
  }
  return {
    model,
    options,
    register,
    formControlProps
  }
}
