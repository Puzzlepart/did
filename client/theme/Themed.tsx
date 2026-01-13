import { FluentProvider, useId } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React, { FC, HTMLProps, useMemo } from 'react'

/**
 * A component that applies Fluent UI v9 theme to its children.
 *
 * We want to use `useMemo` to avoid re-rendering the entire app when
 * the context changes.
 *
 * @see https://github.com/Puzzlepart/did/pull/1132
 *
 * @returns - The themed component tree.
 */
export const Themed: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const fluentProviderId = useId('ThemedFluentProvider')
  const context = useAppContext()
  return useMemo(
    () => (
      <FluentProvider
        key='FluentProvider'
        id={fluentProviderId}
        theme={context.user.theme.fluentTheme}
        applyStylesToPortals={true}
        className={props.className}
      >
        {props.children}
      </FluentProvider>
    ),
    []
  )
}

Themed.displayName = 'Themed'
