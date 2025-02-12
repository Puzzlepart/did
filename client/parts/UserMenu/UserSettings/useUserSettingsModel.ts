import { useAppContext } from 'AppContext'
import { useFormControlModel, useFormControls } from 'components'
import get from 'get-value'
import { CONFIG_KEYS } from './types'
import { UserSettings } from './UserSettings'

/**
 * Returns a model and register object for user settings form control.
 *
 * @returns An object containing a model and register object.
 */
export function useUserSettingsModel() {
  const { user } = useAppContext()
  const model = useFormControlModel<any, any>(user, (user) =>
    Object.keys(CONFIG_KEYS).reduce(($, key) => {
      $[CONFIG_KEYS[key]] = get(user, CONFIG_KEYS[key])
      return $
    }, {})
  )
  const register = useFormControls(model, UserSettings)
  return { model, register }
}
