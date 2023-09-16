import { useMap } from 'hooks/common/useMap'
import { useRandomFabricIcon } from 'hooks/common/useRandomFabricIcon'
import { useEffect } from 'react'
import { convertToMap } from 'utils/convertToMap'
import { ProjectModel } from './ProjectModel'
import { IProjectFormProps } from './types'

/**
 * Initializes the model based on `props.edit`. Sets a random
 * fabric icon using hook `useRandomFabricIcon`.
 *
 * @param map - Map
 * @param props - Props
 */
export function useInitModel(
  map: ReturnType<typeof useMap>,
  props: IProjectFormProps
): void {
  const icon = useRandomFabricIcon()
  useEffect(() => {
    const model = new ProjectModel().init(props.edit)
    const _map = convertToMap(model)
    map.$set(_map)
    if (!props.edit) map.set('icon', icon)
    if (props.customerKey) map.set('customerKey', props.customerKey)
  }, [props.edit, props.customerKey])
}

/**
 * Returns the model and functions to update
 * the `key`, `name`, `description` and `icon`
 *
 * @param props - Props
 *
 * @returns the initial model
 */
export function useProjectModel(props: IProjectFormProps) {
  const map = useMap<keyof ProjectModel, ProjectModel>()

  useInitModel(map, props)

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
