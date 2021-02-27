/* eslint-disable @typescript-eslint/no-empty-function */
import { AppContext } from 'AppContext'
import { useContext, useState } from 'react'
import { useBrowserStorage } from './../../hooks'
import { IUserNotificationsState, NotificationModel } from './types'

/**
 * Hook for UserNotifications
 */
export const useUserNotifications = () => {
  const [state, dispatch] = useState<IUserNotificationsState>({})
  const { notificationsQuery } = useContext(AppContext)

  const showPanel = () => dispatch({ ...state, showPanel: true })
  const dismissPanel = () => dispatch({ ...state, showPanel: false })

  const { value, append, clear } = useBrowserStorage({
    key: 'did_dismissed_notifications',
    initialValue: []
  })

  const notifications = notificationsQuery.notifications
    .map((n) => new NotificationModel(n))
    .filter((n) => value.indexOf(n.id) === -1)

  return {
    notifications,
    dismissedCount:
      notificationsQuery.notifications.length - notifications.length,
    panelOpen: state.showPanel,
    showPanel,
    dismissPanel,
    dismissNotification: (id: string) => append(id),
    clearDismissed: clear
  }
}
