import { TFunction } from 'i18next'
import { IProjectFormValidationOptions, ProjectModel } from './types'

/**
 * Validate form
 *
 * @param {ProjectModel} model Model
 * @param {TFunction} t Translate function
 * @param {IProjectFormValidationOptions} options Validation options
 */
export const validateForm = (
  model: ProjectModel,
  t: TFunction,
  options: IProjectFormValidationOptions
) => {
  const errors: { [key: string]: string } = {}
  if (!model.customerKey) {
    errors.customerKey = t('projects.customerFormValidationText')
  }
  if (model.name.length < options.nameMinLength) {
    errors.name = t('projects.nameFormValidationText', options)
  }
  if (!/(^[A-ZÆØÅ0-9]{2,8}$)/gm.test(model.projectKey)) {
    errors.key = t('projects.keyFormValidationText', { keyMinLength: 2, keyMaxLength: 8 })
  }
  return { errors, invalid: Object.keys(errors).length > 0 }
}
