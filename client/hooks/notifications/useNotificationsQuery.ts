import { useQuery } from '@apollo/client'
import { ContextUser } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { Notification } from 'types'
import notificationsQuery from './notifications.gql'

/**
 * Notificatins query hook
 *
 * @param user - Context user
 */
export function useNotificationsQuery(
  user: ContextUser
): { notifications: Notification[]; refetch: (delay?: number) => void } {
  const { t } = useTranslation()
  const { data, refetch } = useQuery(notificationsQuery, {
    skip: !user.displayName,
    variables: {
      templates: t('notifications.templates', { returnObjects: true }),
      locale: user?.language
    },
    fetchPolicy: 'cache-and-network'
  })
  return {
    notifications: data?.notifications || [],
    refetch: (delay = 0) => {
      window.setTimeout(refetch, delay)
    }
  }
}
