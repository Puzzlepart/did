import { ThemeProvider } from '@fluentui/react'
import { FluentProvider } from '@fluentui/react-components'
import React, { FC } from 'react'
import { IThemedProps } from './types'

/**
 * A component that applies Fluent UI and custom theme to its children,
 * using both `<ThemeProvider>` and `<FluentProvider>` to support both
 * `@fluentui/react` and `@fluentui/react-components` components.
 *
 * @param props - The component props.
 *
 * @returns - The themed component.
 */
export const Themed: FC<IThemedProps> = (props) => {
  const [legacyTheme, fluentTheme] = props.theme
  return (
    <ThemeProvider applyTo={props.applyTo} theme={legacyTheme}>
      <FluentProvider theme={fluentTheme} applyStylesToPortals={true}>
        {props.children}
      </FluentProvider>
    </ThemeProvider>
  )
}

Themed.displayName = 'Themed'
Themed.defaultProps = {
  applyTo: 'body'
}
