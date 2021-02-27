/* eslint-disable @typescript-eslint/no-empty-function */
import { AppContext } from 'AppContext'
import { useContext } from 'react'
import { IUserNotificationsState, NotificationModel } from './types'

export const useUserNotifications = ([state, dispatch]: [IUserNotificationsState, React.Dispatch<React.SetStateAction<IUserNotificationsState>>]) => {
    const app = useContext(AppContext)
    const notifications = app.notifications[0].map(n => new NotificationModel(n))

    const showPanel = () => dispatch({ ...state, showPanel: true })
    const dismissPanel = () => dispatch({ ...state, showPanel: false })

    return {
        notifications,
        panelOpen: state.showPanel,
        showPanel,
        dismissPanel
    }
}
