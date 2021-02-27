import AppConfig from 'AppConfig'
import { TFunction } from 'i18next'
import { ProjectModel } from './types'

/**
 * Validate form
 *
 * @param {ProjectModel} model Model
 * @param {TFunction} t Translate function
 */
export const validateForm = (model: ProjectModel, t: TFunction) => {
  const {
    PROJECT_KEY_MIN_LENGTH,
    PROJECT_KEY_MAX_LENGTH,
    PROJECT_NAME_MIN_LENGTH
  } = AppConfig
  const PROJECT_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9-]{${PROJECT_KEY_MIN_LENGTH},${PROJECT_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  const errors: { [key: string]: string } = {}
  if (!model.customerKey) {
    errors.customerKey = t('projects.customerFormValidationText')
  }
  if (model.name.length < PROJECT_NAME_MIN_LENGTH) {
    errors.name = t('projects.nameFormValidationText', AppConfig)
  }
  if (!PROJECT_KEY_REGEX.test(model.key)) {
    errors.key = t('projects.keyFormValidationText', AppConfig)
  }
  return { errors, invalid: Object.keys(errors).length > 0 }
}
