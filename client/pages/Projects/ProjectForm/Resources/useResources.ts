import { useTranslation } from 'react-i18next'
import { useSubscriptionSettings } from 'AppContext'
import _ from 'lodash'
import { AdditionalMetadataField } from 'components/FormControl/UserPickerControl/UserPicker'

export function useResources() {
  const { t } = useTranslation()
  const resourceMetadata = useSubscriptionSettings<string[]>(
    'projects.resourceMetadata',
    []
  )
  const additionalMetadata = _.pick(
    {
      hourlyRate: {
        label: t('common.hourlyRate'),
        type: 'number',
        renderAs: 'currency'
      } as AdditionalMetadataField,
      projectRole: {
        label: t('common.projectRole'),
        type: 'text'
      } as AdditionalMetadataField
    },
    resourceMetadata
  )
  return { additionalMetadata }
}
