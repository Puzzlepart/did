/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { IAppContext } from 'AppContext'
import { usePages } from 'pages/usePages'
import { useMemo } from 'react'
import { useNotificationsQuery } from '../hooks'
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
  return context
}
