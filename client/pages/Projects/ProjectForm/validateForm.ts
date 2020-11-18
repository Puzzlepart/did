import { TFunction } from 'i18next'
import { IProjectFormState } from './types'

/**
 * Validate form
 *
 * @param {IProjectFormState} state State
 * @param {TFunction} t Translate function
 */
export const validateForm = (state: IProjectFormState, t: TFunction) => {
  const nameMinLength = 2
  const errors: { [key: string]: string } = {}
  if (!state.model.customerKey) {
    errors.customerKey = t('projects.customerFormValidationText')
  }
  if (state.model.name.length < nameMinLength) {
    errors.name = t('projects.nameFormValidationText', { nameMinLength })
  }
  if (!/(^[A-ZÆØÅ0-9]{2,8}$)/gm.test(state.model.key)) {
    errors.key = t('projects.keyFormValidationText', { keyMinLength: 2, keyMaxLength: 8 })
  }
  state.validation = { errors, invalid: Object.keys(errors).length > 0 }
  return state.validation
}
