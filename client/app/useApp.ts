import createActivityDetector from 'activity-detector'
import { IAppContext } from 'AppContext'
import { IToastProps } from 'components'
import { usePages } from 'pages/usePages'
import { useEffect, useMemo } from 'react'
import { useNotificationsQuery } from '../hooks'
import { useUpdateUserConfiguration } from '../hooks/user/useUpdateUserConfiguration'
import useAppReducer, { SET_TOAST } from './reducer'
import { IAppProps } from './types'

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

  /**
   * Displays a toast message with the given properties and duration (which defaults to 6 seconds).
   *
   * @param text - The text of the toast message.
   * @param intent - The intent of the toast message (default: **info**).
   * @param duration - The duration in seconds to display the toast message (default: **6**).
   * @param additionalProps - Additional properties to pass to the toast message.
   */
  const displayToast = (
    text: IToastProps['text'],
    intent: IToastProps['intent'] = 'info',
    duration: number = 6,
    additionalProps: Partial<IToastProps> = {}
  ) => {
    context.dispatch(
      SET_TOAST({
        text,
        intent,
        ...additionalProps
      })
    )
    setTimeout(() => {
      context.dispatch(SET_TOAST(null))
    }, duration * 1000)
  }

  const context = useMemo<IAppContext>(
    () =>
      ({
        ...props,
        pages,
        notifications,
        state,
        dispatch,
        displayToast
      }) as IAppContext,
    [state, notifications]
  )

  useLastActiveUpdater()

  return context
}
