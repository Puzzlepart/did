/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMap } from 'hooks/common/useMap'
import { useMemo } from 'react'
import { Project } from 'types'
import { keys, pick } from 'underscore'
import { IProjectFormProps, ProjectModel, _ProjectModel } from './types'
import { useProjectFormValidation } from './useProjectFormValidation'

/**
 * Returns the initial model based on `edit`
 * from `props`
 *
 * @param edit - Project
 *
 * @returns the initial model
 */
export function useInitialModel(edit: Project): Map<any, any> {
  return useMemo(() => {
    const model = edit || _ProjectModel
    return new Map(Object.entries(pick(model, keys(_ProjectModel))))
  }, [edit])
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
  const _model = useInitialModel(props.edit)
  const map = useMap<keyof ProjectModel>(_model)

  const valid = useProjectFormValidation(map.$)

  /**
   * Project ID is not included the mutation
   * sent to GraphQL but it's needed for display
   * in the form.
   */
  const projectId = [map.value('customerKey'), map.value('key')].join(' ')

  return {
    ...map,
    valid,
    projectId
  }
}
