import { useQuery } from '@apollo/client'
import { ContextUser } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { Notification } from 'types'
import notificationsQuery from './notifications.gql'

/**
 * Notificatins hook
 *
 * @param user - Context user
 */
export function useNotifications(
  user: ContextUser
): [Notification[], () => Promise<any>] {
  const { t } = useTranslation()
  const { data, refetch } = useQuery(notificationsQuery, {
    skip: !user.displayName,
    variables: {
      templates: t('notifications.templates', { returnObjects: true }),
      locale: user?.language
    },
    fetchPolicy: 'cache-and-network'
  })
  return [data?.notifications || [], refetch]
}
