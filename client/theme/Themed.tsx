import { ThemeProvider } from '@fluentui/react'
import { FluentProvider } from '@fluentui/react-components'
import { PortalCompatProvider } from '@fluentui/react-portal-compat'
import { AppContext } from 'AppContext'
import React, { FC, HTMLProps } from 'react'

/**
 * A component that applies Fluent UI and custom theme to its children,
 * using both `<ThemeProvider>` and `<FluentProvider>` to support both
 * `@fluentui/react` and `@fluentui/react-components` components.
 *
 * @returns - The themed component.
 */
export const Themed: FC<HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => (
        <ThemeProvider
          applyTo='body'
          theme={context.user.theme[0]}
          className={props.className}
          hidden={props.hidden}
        >
          <FluentProvider
            theme={context.user.theme[1]}
            applyStylesToPortals={true}
          >
            <PortalCompatProvider>{props.children}</PortalCompatProvider>
          </FluentProvider>
        </ThemeProvider>
      )}
    </AppContext.Consumer>
  )
}

Themed.displayName = 'Themed'
