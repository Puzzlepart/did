import { useFormControlModel } from 'components'
import { useCustomersContext } from 'pages/Customers/context'
import { useMemo } from 'react'
import { Project } from 'types'
import _ from 'underscore'
import { mapProperty } from 'utils'
import { IProjectFormProps } from './types'

/**
 * Creates a model for the project form based on `props.edit` and the
 * customer context if available.
 *
 * @param props - Props
 *
 * @returns the initial model
 */
export function useProjectModel(props: IProjectFormProps) {
  const customerKey = useCustomersContext('state.selected.key')
  const initialModel = useMemo<Partial<Project>>(
    () => props.edit ?? (customerKey ? { customerKey } : undefined),
    [props.edit, customerKey]
  )
  const map = useFormControlModel<keyof Project, Partial<Project>>(
    initialModel,
    (p) =>
      _.omit(
        {
          ...p,
          labels: mapProperty<any, string>(p.labels, 'name')
        },
        ['customer', 'tag']
      )
  )

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
