import packageFile from 'package'
import { CustomerModel } from './CustomerModel'

/**
 * Validate customer form.
 *
 * * We check that customer key matches our regex
 * * We check that the name length is longer than `CUSTOMER_NAME_MIN_LENGTH`
 * * We check that a icon is selected
 *
 * @param model - Model
 *
 * @returns `true` if the model is valid
 */
export function useCustomerFormValidation(model: CustomerModel): boolean {
  const {
    CUSTOMER_KEY_MIN_LENGTH,
    CUSTOMER_KEY_MAX_LENGTH,
    CUSTOMER_NAME_MIN_LENGTH
  } = packageFile.config.app
  const CUSTOMER_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9]{${CUSTOMER_KEY_MIN_LENGTH},${CUSTOMER_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  if (model?.name?.length < CUSTOMER_NAME_MIN_LENGTH) return false
  if (!CUSTOMER_KEY_REGEX.test(model?.key)) return false
  if (!model?.icon) return false
  return true
}
