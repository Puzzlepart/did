import { useTranslation } from 'react-i18next'
import { useSubscriptionSettings } from 'AppContext'
import _ from 'lodash'
import { ProjectRoleField, HourlyRateField } from './types'
import { usePredefinedRoles } from './usePredefinedRoles'

export function useResources() {
  const { t } = useTranslation()
  const resourceMetadata = useSubscriptionSettings<string[]>(
    'projects.resourceMetadata',
    []
  )
  const predefinedRoleField = usePredefinedRoles()
  if (predefinedRoleField) {
    return {
      additionalMetadata: predefinedRoleField
    }
  }
  const additionalMetadata = _.pick(
    {
      hourlyRate: HourlyRateField(t),
      projectRole: ProjectRoleField(t)
    },
    resourceMetadata
  )
  return { additionalMetadata }
}
