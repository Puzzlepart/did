import { ThemeProvider } from '@fluentui/react'
import { FluentProvider, useId } from '@fluentui/react-components'
import { PortalCompatProvider } from '@fluentui/react-portal-compat'
import { useAppContext } from 'AppContext'
import React, { FC, HTMLProps, useMemo } from 'react'

/**
 * A component that applies Fluent UI and custom theme to its children,
 * using both `<ThemeProvider>` and `<FluentProvider>` to support both
 * `@fluentui/react` and `@fluentui/react-components` components. Also
 * uses `<PortalCompatProvider>` to support e.g. `Panel` and `Dialog`
 * components from `@fluentui/react`.
 *
 * We want to use `useMemo` to avoid re-rendering the entire app when
 * the context changes.
 *
 * @see https://github.com/Puzzlepart/did/pull/1132
 *
 * @returns - The themed component tree.
 */
export const Themed: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const themeProviderId = useId('ThemeProvider')
  const fluentProviderId = useId('ThemedFluentProvider')
  const context = useAppContext()
  return useMemo(
    () => (
      <ThemeProvider
        key='ThemeProvider'
        id={themeProviderId}
        applyTo='body'
        theme={context.user.theme.legacyTheme}
        className={props.className}
        hidden={props.hidden}
      >
        <FluentProvider
          key='FluentProvider'
          id={fluentProviderId}
          theme={context.user.theme.fluentTheme}
          applyStylesToPortals={true}
        >
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      </ThemeProvider>
    ),
    []
  )
}

Themed.displayName = 'Themed'
