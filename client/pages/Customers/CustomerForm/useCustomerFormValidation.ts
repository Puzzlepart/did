import { useMap } from 'hooks/common/useMap'
import { config } from 'package'

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
export function useCustomerFormValidation({
  $
}: ReturnType<typeof useMap>): boolean {
  const {
    CUSTOMER_KEY_MIN_LENGTH,
    CUSTOMER_KEY_MAX_LENGTH,
    CUSTOMER_NAME_MIN_LENGTH
  } = config.app
  const CUSTOMER_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9]{${CUSTOMER_KEY_MIN_LENGTH},${CUSTOMER_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  if ($?.name?.length < CUSTOMER_NAME_MIN_LENGTH) return false
  if (!CUSTOMER_KEY_REGEX.test($?.key)) return false
  if (!$?.icon) return false
  return true
}
