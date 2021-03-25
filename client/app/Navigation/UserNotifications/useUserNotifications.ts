/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useAppContext } from 'AppContext'
import { useBrowserStorage } from '../../../hooks'
import { NotificationModel } from './types'

/**
 * Hook for UserNotifications
 *
 * @category UserNotifications
 */
export const useUserNotifications = () => {
  const { notifications } = useAppContext()
  const [dismissedIds, dismissNotification, clearDismissed] = useBrowserStorage<
    string[]
  >({
    key: 'did_dismissed_notifications',
    initialValue: []
  })
  const notifications_ = notifications.data
    .map((n) => new NotificationModel(n))
    .filter((n) => !dismissedIds.includes(n.id))
  const count = notifications_.length
  const dismissedCount = notifications.data.length - count

  return {
    notifications: notifications_,
    count,
    dismissedCount,
    dismissNotification,
    clearDismissed
  }
}
