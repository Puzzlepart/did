import { FluentProvider, useId } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React, { FC, HTMLProps, useEffect, useMemo } from 'react'

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
  const theme = context.user.theme.fluentTheme

  // Apply theme background color to body element
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor
    const originalColor = document.body.style.color

    document.body.style.backgroundColor = theme.colorNeutralBackground1
    document.body.style.color = theme.colorNeutralForeground1

    return () => {
      document.body.style.backgroundColor = originalBg
      document.body.style.color = originalColor
    }
  }, [theme])

  // Note: useMemo with empty deps to prevent re-rendering the entire app
  // when context changes. The FluentProvider will handle theme updates via props.
  return useMemo(
    () => (
      <FluentProvider
        key='FluentProvider'
        id={fluentProviderId}
        theme={theme}
        applyStylesToPortals={true}
        className={props.className}
      >
        {props.children}
      </FluentProvider>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

Themed.displayName = 'Themed'
