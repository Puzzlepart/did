import { ValidatorFunction } from 'components'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../context'
import _ from 'lodash'

/**
 * Returns a validator function that checks if the given value is a valid project key.
 *
 * @returns A ValidatorFunction that returns an error message and 'error' status if
 * the key is not valid, or null if it is valid.
 */
export function useValidateKeyFunction() {
  const { t } = useTranslation()
  const PROJECT_KEY_REGEX = new RegExp('(^[A-ZÆØÅ0-9-]{2,12}$)', 'gm')
  const ValidateKeyFunction: ValidatorFunction<string> = (value) => {
    return (
      !PROJECT_KEY_REGEX.test(value) && [
        t('projects.keyInvalid', { min: 2, max: 12 }),
        'error'
      ]
    )
  }
  return ValidateKeyFunction
}

/**
 * Returns an validator function that checks if the provided `key` is
 * unique among the customers.
 *
 * @param customerKey  The key of the selected customer.
 * @param enabled  Whether the validation is enabled (default: `false`).
 *
 * @returns An validator function that resolves with an error message
 * if the key is not unique, or null if it is unique.
 */
export function useValidateUniqueKeyFunction(customerKey: string, enabled = false) {
  const context = useProjectsContext()
  const { t } = useTranslation()
  const ValidateUniqueKeyFunction: ValidatorFunction<string> = (value) => {
    if (!enabled) return null
    const projects = context.state.projects.filter(
      (p) => p.customerKey === customerKey
    )
    if (_.isEmpty(projects)) return null
    const existingProject = projects.find((p) => p.key === value)
    if (!existingProject) return null
    return [
      t('projects.keyNotUniqueError', {
        ...existingProject.customer,
        key: value
      }),
      'error'
    ]
  }
  return ValidateUniqueKeyFunction
}
