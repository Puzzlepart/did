import { IInputFieldProps } from 'components'
import { ListField } from 'components/FormControl/ListControl/ListInput'
import { useTranslation } from 'react-i18next'

export function useRoleDefinitions() {
  const { t } = useTranslation()
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
    } as ListField<Partial<IInputFieldProps>>
  ]
  return { fields }
}
