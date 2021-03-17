/* eslint-disable no-console */
/* eslint-disable tsdoc/syntax */
import { FetchPolicy, useQuery } from '@apollo/client'
import { ContextUser } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { Notification } from 'types'
import notificationsQuery from './notifications.gql'

/**
 * Notificatins query hook
 *
 * @param user - Context user
 *
 * @category React Hook
 */
export function useNotificationsQuery(
  user: ContextUser,
  fetchPolicy: FetchPolicy = 'cache-first'
): { notifications: Notification[]; refetch: (delay?: number) => void } {
  const { t } = useTranslation()
  const { data, refetch } = useQuery(notificationsQuery, {
    variables: {
      templates: t('notifications.templates', { returnObjects: true }),
      locale: user?.preferredLanguage
    },
    fetchPolicy
  })
  return {
    notifications: data?.notifications || [],
    refetch: (delay = 0) => {
      window.setTimeout(refetch, delay)
    }
  }
}
