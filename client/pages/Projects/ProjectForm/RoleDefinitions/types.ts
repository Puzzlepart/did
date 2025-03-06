import { GetFieldFunction, IInputFieldProps } from 'components'

export const NameField: GetFieldFunction<Partial<IInputFieldProps>> = (t) => ({
  key: 'name',
  type: 'text',
  label: t('common.projectRole'),
  required: true,
  props: {
    placeholder: t('projects.roleDefinitions.rolePlaceholder')
  }
})

export const HourlyRateField: GetFieldFunction<Partial<IInputFieldProps>> = (
  t
) => ({
  key: 'hourlyRate',
  type: 'number',
  label: t('common.hourlyRate'),
  renderAs: 'currency',
  required: true,
  maxWidth: 80,
  props: {
    placeholder: t('projects.roleDefinitions.hourlyRatePlaceholder')
  }
})

export const IsDefaultField: GetFieldFunction<Partial<IInputFieldProps>> = (
  t,
  defaultRole
) => ({
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
})
