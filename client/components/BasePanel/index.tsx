/* eslint-disable unicorn/prevent-abbreviations */
import { IPanelProps, Panel } from '@fluentui/react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'

/**
 * Renders a Panel with the content wrapped in `<FluentProvider />` from
 * [@fluentui/react-components](@fluentui/react-components)
 *
 * @category Reusable Component
 */
export const BasePanel: ReusableComponent<IPanelProps> = (props) => {
  return (
    <Panel {...props}>
      <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
    </Panel>
  )
}
