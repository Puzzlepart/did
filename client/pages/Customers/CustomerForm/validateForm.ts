import { TFunction } from 'i18next'
import { config } from 'package'
import { IFormValidation } from 'types'
import { CustomerModel } from './types'

/**
 * Validate form
 *
 * @param model - Model
 * @param t - Translate function
 */
export const validateForm = (
  model: CustomerModel,
  t: TFunction
): IFormValidation => {
  const {
    CUSTOMER_KEY_MIN_LENGTH,
    CUSTOMER_KEY_MAX_LENGTH,
    CUSTOMER_NAME_MIN_LENGTH
  } = config.app
  const CUSTOMER_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9]{${CUSTOMER_KEY_MIN_LENGTH},${CUSTOMER_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  const errors: { [key: string]: string } = {}
  if (model.name.length < CUSTOMER_NAME_MIN_LENGTH) {
    errors.name = t('customers.nameFormValidationText', config.app)
  }
  if (!CUSTOMER_KEY_REGEX.test(model.key)) {
    errors.key = t('customers.keyFormValidationText', config.app)
  }
  return { errors, invalid: Object.keys(errors).length > 0 }
}
