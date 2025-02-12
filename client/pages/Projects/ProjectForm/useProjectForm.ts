import { IFormControlProps, useFormControls } from 'components/FormControl'
import { ComponentLogicHook } from 'hooks'
import { IProjectFormProps } from './types'
import { useProjectFormOptions } from './useProjectFormOptions'
import { useProjectFormSubmit } from './useProjectFormSubmit'
import { useProjectModel } from './useProjectModel'
import { ProjectForm } from './ProjectForm'

type UseProjectFormReturnType = {
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
  const register = useFormControls(model, ProjectForm)
  const submitProps = useProjectFormSubmit(props, model, options)
  const formControlProps: IFormControlProps = {
    ...props,
    id: ProjectForm.displayName,
    model,
    register,
    isEditMode: Boolean(props.edit),
    submitProps,
    validateOnBlur: true,
    additionalContext: new Map<string, any>([
      ['options', options],
      ['setOptions', (key: any, value: any) => options.set(key, value)]
    ])
  }

  return {
    formControlProps
  }
}
