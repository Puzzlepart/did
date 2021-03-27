/* eslint-disable tsdoc/syntax */
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
  const submit = useProjectFormSubmit(props, model,options)
  return {
    model,
    submit,
    options
  }
}


