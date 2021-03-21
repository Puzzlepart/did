/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
/**
 * The App component
 *
 * @module App
 */
import React from 'react'
import { AppRouter } from './AppRouter'
import { AppContext } from './context'
import { ErrorFallback } from './ErrorFallback'
import { MobileBreadcrumb } from './MobileBreadcrumb'
import { Navigation } from './Navigation'
import { IAppProps } from './types'
import { useApp } from './useApp'

/**
 * App
 *
 * @category App
 */
export const App: React.FC<IAppProps> = (props) => {
  const context = useApp(props)
  return (
    <AppContext.Provider value={context}>
      <AppRouter />
    </AppContext.Provider>
  )
}

export * from './context'
export { ErrorFallback, MobileBreadcrumb, Navigation, AppRouter }
