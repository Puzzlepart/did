import { ListField } from 'components/FormControl/ListControl/ListInput'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../../context'
import { RoleDefinitions } from './RoleDefinitions'
import { HourlyRateField, IsDefaultField, NameField } from './types'

export function useRoleDefinitions() {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const roleDefinitions = _.get(
    context.state.selected,
    `extensions.${RoleDefinitions.extensionId}.properties.roleDefinitions`,
    []
  )
  const defaultRole = roleDefinitions.find(({ isDefault }) => isDefault)
  const fields: ListField[] = [
    NameField(t),
    HourlyRateField(t),
    IsDefaultField(t, defaultRole)
  ]
  return { fields }
}
