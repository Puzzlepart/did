import { GetFieldFunction, IInputFieldProps } from 'components'

export const NameField: GetFieldFunction<Partial<IInputFieldProps>> = (t) => ({
  key: 'name',
  type: 'text',
  label: t('common.projectRole'),
  required: true,
  props: {
    form: {
      placeholder: t('projects.roleDefinitions.rolePlaceholder')
    }
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
  editable: true,
  maxWidth: 80,
  props: {
    list: {
      contentBefore: t('common.currencySymbol'),
      styles: {
        input: {
          maxWidth: 80
        }
      }
    },
    form: {
      placeholder: t('projects.roleDefinitions.hourlyRatePlaceholder'),
      contentBefore: t('common.currencySymbol')
    }
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
  defaultValue: false,
  props: {
    form: {
      hint: t('projects.roleDefinitions.defaultRoleDescription'),
      disabled: Boolean(defaultRole),
      validationState: Boolean(defaultRole) && 'error',
      validationMessage:
        Boolean(defaultRole) &&
        t('projects.roleDefinitions.defaultRoleError', {
          role: defaultRole.name
        })
    }
  }
})
