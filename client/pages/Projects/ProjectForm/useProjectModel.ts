import { useFormControlModel } from 'components'
import { useCustomersContext } from 'pages/Customers/context'
import { useEffect } from 'react'
import { ProjectInput } from 'types'
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
  const map = useFormControlModel<keyof ProjectInput, Partial<ProjectInput>>(
    props.edit as ProjectInput,
    (p) =>
      _.omit(
        {
          // Ensure inactive has an explicit boolean value; avoid undefined -> null in mutation
          inactive: p?.inactive ?? false,
          ...p,
          labels: mapProperty<any, string[]>(p.labels, 'name')
        },
        // Omit server-resolved / object fields that are not part of ProjectInput
        // and would otherwise leak into the mutation variables (causing GraphQL errors)
        ['customer', 'tag', 'outlookCategory', 'partner', 'parent', 'children']
      ),
    { useNestedKeys: true }
  )
  const customerKey = useCustomersContext<string>('state.selected.key')

  useEffect(() => {
    if (customerKey) {
      map.set('customerKey', customerKey)
    }
  }, [customerKey])

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
