/* eslint-disable react-hooks/exhaustive-deps */
/**
 * The App component
 *
 * @module App
 */
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
    </AppContext.Provider>
  )
}

export * from './context'
