import { TFunction } from 'i18next'
import { IFormValidation } from 'types'
import { CustomerModel } from './types'
import AppConfig from 'AppConfig'

/**
 * Validate form
 *
 * @param {CustomerModel} model Model
 * @param {TFunction} t Translate function
 */
export const validateForm = (model: CustomerModel, t: TFunction): IFormValidation => {
  const { CUSTOMER_KEY_MIN_LENGTH, CUSTOMER_KEY_MAX_LENGTH, CUSTOMER_NAME_MIN_LENGTH } = AppConfig
  const CUSTOMER_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9]{${CUSTOMER_KEY_MIN_LENGTH},${CUSTOMER_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  const errors: { [key: string]: string } = {}
  if (model.name.length < CUSTOMER_NAME_MIN_LENGTH) {
    errors.name = t('customers.nameFormValidationText', AppConfig)
  }
  if (!CUSTOMER_KEY_REGEX.test(model.key)) {
    errors.key = t('customers.keyFormValidationText', AppConfig)
  }
  return { errors, invalid: Object.keys(errors).length > 0 }
}
