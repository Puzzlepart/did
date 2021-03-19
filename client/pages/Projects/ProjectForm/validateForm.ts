import { TFunction } from 'i18next'
import { config } from 'package'
import { ProjectModel } from './types'

/**
 * Validate form
 *
 * @param model - Model
 * @param t - Translate function
 */
export const validateForm = (model: ProjectModel, t: TFunction) => {
  const PROJECT_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9-]{${config.app.PROJECT_KEY_MIN_LENGTH},${config.app.PROJECT_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  const errors: { [key: string]: string } = {}
  if (!model.customerKey) {
    errors.customerKey = t('projects.customerFormValidationText')
  }
  if (model.name.length < config.app.PROJECT_NAME_MIN_LENGTH) {
    errors.name = t('projects.nameFormValidationText', config.app)
  }
  if (!PROJECT_KEY_REGEX.test(model.key)) {
    errors.key = t('projects.keyFormValidationText', config.app)
  }
  return { errors, invalid: Object.keys(errors).length > 0 }
}
