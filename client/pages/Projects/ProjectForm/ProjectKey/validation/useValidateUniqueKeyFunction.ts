import { ValidatorFunction } from 'components'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../../../context'

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

export function useValidateUniqueKeyFunction(
  customerKey: string,
  enabled = false
) {
  const context = useProjectsContext()
  const { t } = useTranslation()
  const ValidateUniqueKeyFunction: ValidatorFunction<string> = (value) => {
    if (!enabled) return null

    if (_.isEmpty(context.state?.projects)) return null

    const projects = context.state.projects.filter(
      (p) => p.customer?.key === customerKey
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
