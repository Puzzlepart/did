/**
 * The App component
 *
 * @module App
 */
import { Toast } from 'components'
import React, { FC } from 'react'
import { AppRouter } from './AppRouter'
import { AppContext } from './context'
import { IAppProps } from './types'
import { useApp } from './useApp'

/**
 * App
 *
 * @category App
 */
export const App: FC<IAppProps> = (props) => {
  const context = useApp(props)
  return (
    <AppContext.Provider value={context}>
      <AppRouter />
      <Toast {...context.state.toast} />
    </AppContext.Provider>
  )
}
