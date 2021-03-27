import { config } from 'package'
import { ProjectModel } from './types'

/**
 * Validate form
 *
 * @param model - Model
 * @param t - Translate function
 */
export function useProjectFormValidation(model: Record<keyof ProjectModel, any>): boolean {
  const PROJECT_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9-]{${config.app.PROJECT_KEY_MIN_LENGTH},${config.app.PROJECT_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  if (!model.customerKey) return false
  if (model.name.length < config.app.PROJECT_NAME_MIN_LENGTH) return false
  if (!PROJECT_KEY_REGEX.test(model.key)) return false
  if (!model.icon) return false
  return true
}
