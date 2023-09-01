import { PartialTheme, ThemeProvider } from '@fluentui/react'
import { FluentProvider, Theme } from '@fluentui/react-components'
import React, { FC, ReactNode } from 'react'

/**
 * A component that applies Fluent UI and custom theme to its children,
 * using both `<ThemeProvider>` and `<FluentProvider>` to support both
 * `@fluentui/react` and `@fluentui/react-components` components.
 *
 * @param props - The component props.
 *
 * @returns - The themed component.
 */
export const Themed: FC<{ theme: [PartialTheme, Theme]; children: ReactNode }> =
  ({ theme, children }) => {
    return (
      <ThemeProvider applyTo='body' theme={theme[0]}>
        <FluentProvider theme={theme[1]}>{children}</FluentProvider>
      </ThemeProvider>
    )
  }
