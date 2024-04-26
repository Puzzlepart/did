import { useTranslation } from 'react-i18next'
import { useSubscriptionSettings } from 'AppContext'
import _ from 'lodash'

export function useResources() {
  const { t } = useTranslation()
  const resourceMetadata = useSubscriptionSettings<string[]>(
    'projects.resourceMetadata',
    []
  )
  const additionalMetadata = _.pick(
    {
      hourlyRate: t('common.hourlyRate'),
      projectRole: t('common.projectRole')
    },
    resourceMetadata
  )
  return { additionalMetadata }
}
