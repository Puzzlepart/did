import __package from 'package'
import { useCallback } from 'react'
import { ProjectModel } from './ProjectModel'

/**
 * Validate form
 *
 * @param model - Model
 */
export function useValidator(): (model: ProjectModel) => boolean {
  const validator = useCallback((model: ProjectModel) => {
    const PROJECT_KEY_REGEX = new RegExp(
      `(^[A-ZÆØÅ0-9-]{${__package.config.app.PROJECT_KEY_MIN_LENGTH},${__package.config.app.PROJECT_KEY_MAX_LENGTH}}$)`,
      'gm'
    )
    if (!model?.customerKey) return false
    if (model?.name?.length < __package.config.app.PROJECT_NAME_MIN_LENGTH)
      return false
    if (!PROJECT_KEY_REGEX.test(model?.key)) return false
    if (!model.icon) return false
    return true
  }, [])
  return validator
}
