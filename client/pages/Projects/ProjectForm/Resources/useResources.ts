import { useTranslation } from 'react-i18next'
import { useSubscriptionSettings } from 'AppContext'
import _ from 'lodash'
import { ProjectRoleField, HourlyRateField } from './types'
import { usePredefinedRoles } from './usePredefinedRoles'
import { IUserPickerProps } from 'components/FormControl/UserPickerControl/UserPicker'

export function useResources() {
  const { t } = useTranslation()
  const resourceMetadata = useSubscriptionSettings<string[]>(
    'projects.resourceMetadata',
    []
  )
  const predefinedRoleField = usePredefinedRoles()
  let additionalMetadata = _.pick(
    {
      hourlyRate: HourlyRateField(t),
      projectRole: ProjectRoleField(t)
    },
    resourceMetadata
  )
  let allowEdit = true
  let onRenderValue: IUserPickerProps['list']['onRenderValue'] = null
  if (predefinedRoleField) {
    additionalMetadata = predefinedRoleField
    allowEdit = false
    onRenderValue = (value, { user }) =>
      Boolean(user['hourlyRate']) ? `${value} (${user['hourlyRate']})` : value
  }

  return { additionalMetadata, allowEdit, onRenderValue }
}
