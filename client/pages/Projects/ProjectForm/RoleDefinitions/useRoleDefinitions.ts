import { IInputFieldProps } from 'components'
import { ListField } from 'components/FormControl/ListControl/ListInput'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../../context'
import { RoleDefinitions } from './RoleDefinitions'
import _ from 'lodash'

export function useRoleDefinitions() {
  const { t } = useTranslation()
  const context = useProjectsContext()
  const roleDefinitions = _.get(
    context.state.selected.extensions,
    `${RoleDefinitions.extensionId}.properties.roleDefinitions`,
    []
  )
  const defaultRole = roleDefinitions.find(({ isDefault }) => isDefault)
  const fields: ListField[] = [
    {
      key: 'name',
      type: 'text',
      label: t('common.projectRole'),
      required: true,
      props: {
        placeholder: t('projects.roleDefinitions.rolePlaceholder')
      }
    } as ListField<Partial<IInputFieldProps>>,
    {
      key: 'hourlyRate',
      type: 'number',
      label: t('common.hourlyRate'),
      renderAs: 'currency',
      required: true,
      props: {
        placeholder: t('projects.roleDefinitions.hourlyRatePlaceholder')
      }
    } as ListField<Partial<IInputFieldProps>>,
    {
      key: 'isDefault',
      type: 'boolean',
      label: t('projects.roleDefinitions.defaultRoleLabel'),
      renderAs: 'boolean',
      defaultValue: '',
      required: false,
      props: {
        hint: t('projects.roleDefinitions.defaultRoleDescription'),
        disabled: Boolean(defaultRole),
        validationState: Boolean(defaultRole) && 'error',
        validationMessage:
          Boolean(defaultRole) &&
          t('projects.roleDefinitions.defaultRoleError', {
            role: defaultRole.name
          })
      }
    } as ListField<any>
  ]
  return { fields }
}
