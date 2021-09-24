/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { IAppContext } from 'AppContext'
import { usePages } from 'pages/usePages'
import { useEffect, useMemo } from 'react'
import { useNotificationsQuery } from '../hooks'
import { useUpdateUserConfiguration } from '../hooks/user/useUpdateUserConfiguration'
import useAppReducer from './reducer'
import { IAppProps } from './types'
import createActivityDetector from 'activity-detector'

/**
 * Update `last_active` property for the user.
 * 
 * Using React `useEffect` hook and `createActivityDetector` 
 * to limit number of executions.
 *
 * @category App Hooks
 */
function useLastActiveUpdater() {
  const { updateLastActive } = useUpdateUserConfiguration()
  useEffect(() => {
    const activityDetector = createActivityDetector()
    activityDetector.on('active', updateLastActive)
  }, [])
}

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

  useLastActiveUpdater()

  return context
}
