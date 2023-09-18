import { useFormControlModel } from 'components'
import { Project } from 'types'
import { IProjectFormProps } from './types'
import _ from 'underscore'

/**
 * Returns the model and functions to update
 * the `key`, `name`, `description` and `icon`
 *
 * @param props - Props
 *
 * @returns the initial model
 */
export function useProjectModel(props: IProjectFormProps) {
  const map = useFormControlModel<keyof Project, Project>(props.edit, (p) => _.omit({
    ...p,
    labels: p.labels ? p.labels.map((label) => label.name) : []
  }, ['customer', 'tag']))

  /**
   * Project ID is not included the mutation
   * sent to GraphQL but it's needed for display
   * in the form.
   */
  const projectId =
    map.value('key')?.length > 1
      ? [map.value('customerKey'), map.value('key')].join(' ')
      : null

  return {
    ...map,
    projectId
  }
}
