import { useMap } from 'hooks'
import { config } from 'package'

/**
 * Validate form
 *
 * @param model - Model
 */
export function useProjectFormValidation({
  $
}: ReturnType<typeof useMap>): boolean {
  const PROJECT_KEY_REGEX = new RegExp(
    `(^[A-ZÆØÅ0-9-]{${config.app.PROJECT_KEY_MIN_LENGTH},${config.app.PROJECT_KEY_MAX_LENGTH}}$)`,
    'gm'
  )
  if (!$.customerKey) return false
  if ($.name.length < config.app.PROJECT_NAME_MIN_LENGTH) return false
  if (!PROJECT_KEY_REGEX.test($.key)) return false
  if (!$.icon) return false
  return true
}
