/* eslint-disable @typescript-eslint/no-empty-function */
import { useAppContext } from 'AppContext'
import { useState } from 'react'
import { useBrowserStorage } from '../../../hooks'
import { IUserNotificationsState, NotificationModel } from './types'

/**
 * Hook for UserNotifications
 */
export const useUserNotifications = () => {
  const [state, dispatch] = useState<IUserNotificationsState>({})
  const { notifications } = useAppContext()

  const showPanel = () => dispatch({ ...state, showPanel: true })
  const dismissPanel = () => dispatch({ ...state, showPanel: false })

  const [dismissedIds, dismissNotification, clearDismissed] = useBrowserStorage<
    string[]
  >({
    key: 'did_dismissed_notifications',
    initialValue: []
  })

  const notifications_ = notifications.data
    .map((n) => new NotificationModel(n))
    .filter((n) => !dismissedIds.includes(n.id))

  const dismissedCount = notifications.data.length - notifications_.length

  return {
    notifications: notifications_,
    dismissedCount,
    panelOpen: state.showPanel,
    showPanel,
    dismissPanel,
    dismissNotification,
    clearDismissed
  }
}
