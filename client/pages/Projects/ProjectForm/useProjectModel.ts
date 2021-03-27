/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { useEffect } from 'react'
import { toMap } from 'utils/toMap'
import { ProjectModel } from './ProjectModel'
import { IProjectFormProps } from './types'
import { useProjectFormValidation } from './useProjectFormValidation'

/**
 * Initializes the model based on `props.edit`
 *
 * @param map - Map
 * @param props - Props
 *
 * @returns the initial model
 */
export function useInitModel(
  map: ReturnType<typeof useMap>,
  props: IProjectFormProps
) {
  useEffect(() => {
    const model = new ProjectModel().init(props.edit)
    const _map = toMap(model)
    map.$set(_map)
  }, [props.edit])
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

  const valid = useProjectFormValidation(map.$, !!props.edit)

  useInitModel(map, props)

  /**
   * Project ID is not included the mutation
   * sent to GraphQL but it's needed for display
   * in the form.
   */
  const projectId =
    map.value('key')?.length > 1 &&
    [map.value('customerKey'), map.value('key')].join(' ')

  return {
    ...map,
    valid,
    projectId
  }
}
