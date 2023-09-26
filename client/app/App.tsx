/**
 * The App component
 *
 * @module App
 */
import { Toast } from 'components'
import React, { FC } from 'react'
import { Themed } from 'theme'
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
      <Themed>
        <AppRouter />
        <Toast {...context.state.toast} />
      </Themed>
    </AppContext.Provider>
  )
}
