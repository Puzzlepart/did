/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { IAppContext } from 'AppContext'
import { usePages } from 'pages/usePages'
import { useMemo } from 'react'
import { useNotificationsQuery } from '../hooks'
import { useUpdateUserConfiguration } from '../hooks/user/useUpdateUserConfiguration'
import useAppReducer from './reducer'
import { IAppProps } from './types'

/**
 * Component logic for `App`
 *
 * @category App Hooks
 */
export function useApp(props: IAppProps) {
  const [state, dispatch] = useAppReducer({})
  const notifications = useNotificationsQuery({ user: props.user })
  const pages = usePages()
  const context = useMemo<IAppContext>(
    () =>
    ({
      ...props,
      pages,
      notifications,
      state,
      dispatch
    } as IAppContext),
    [state, notifications]
  )

  const { updateLastActive } = useUpdateUserConfiguration()
  const timeSinceUpdate = Math.floor((Date.now() - new Date(context.user.lastActive).getTime()) / 1000)
  if (!timeSinceUpdate || timeSinceUpdate > 60) {
    // Update lastActive time on page refresh if lastActive is NaN or stale
    updateLastActive(new Date().toISOString())
  }

  return context
}
