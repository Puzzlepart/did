/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */
/* eslint-disable tsdoc/syntax */
import { FetchPolicy, useQuery } from '@apollo/client'
import { ContextUser } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { Notification } from 'types'
import notifications from './notifications.gql'

type NotificationsQueryParams = {
  user: ContextUser
  fetchPolicy?: FetchPolicy
}

type NotificationsQuery = {
  data: Notification[]
  refetch: (delay?: number) => void
}

/**
 * Fetches notifications - returns the data and
 * a function to refetch the data from the server.
 *
 * @param user - Context user
 *
 * @category React Hook
 */
export function useNotificationsQuery({ user, fetchPolicy = 'cache-first' }: NotificationsQueryParams): NotificationsQuery {
  const { t } = useTranslation()
  const { data, refetch } = useQuery(notifications, {
    skip: !user.id,
    variables: {
      templates: t('notifications.templates', { returnObjects: true }),
      locale: user?.preferredLanguage
    },
    fetchPolicy
  })
  return {
    data: data?.notifications || [],
    refetch: (delay = 0) => {
      window.setTimeout(refetch, delay)
    }
  }
}
