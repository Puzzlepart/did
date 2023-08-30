/* eslint-disable react-hooks/exhaustive-deps */
/**
 * The App component
 *
 * @module App
 */
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
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
    <FluentProvider theme={webLightTheme}>
      <AppContext.Provider value={context}>
        <AppRouter />
      </AppContext.Provider>
    </FluentProvider>
  )
}

export * from './context'
