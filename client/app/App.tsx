/**
 * The App component
 *
 * @module App
 */
import React, { FC } from 'react'
import { Themed } from 'theme'
import { AppRouter } from './AppRouter'
import { AppContext } from './context'
import { IAppProps } from './types'
import { useApp } from './useApp'

/**
 * App entry point component.
 *
 * @category App
 */
export const App: FC<IAppProps> = (props) => {
  const context = useApp(props)
  return (
    <AppContext.Provider value={context}>
      <Themed>
        <AppRouter />
      </Themed>
    </AppContext.Provider>
  )
}
