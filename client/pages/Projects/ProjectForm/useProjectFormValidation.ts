import { config } from 'package'
import { ProjectModel } from './ProjectModel'

/**
 * Validate project form
 *
 * * We check that project key matches our regex
 * * We check that the name length is longer than `PROJECT_NAME_MIN_LENGTH`
 * * We check that a icon is selected
 *
 * @param model - Model
 * @param isEditMode -Is edit mode
 */
export function useProjectFormValidation(
  model: ProjectModel,
  isEditMode = false
): boolean {
  const PROJECT_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9-]{${config.app.PROJECT_KEY_MIN_LENGTH},${config.app.PROJECT_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  if (!model.customerKey) return false
  if (model.name.length < config.app.PROJECT_NAME_MIN_LENGTH) return false
  if (!PROJECT_KEY_REGEX.test(model.key) && !isEditMode) return false
  if (!model.icon) return false
  return true
}
