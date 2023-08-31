/* eslint-disable unicorn/prevent-abbreviations */
import { Panel } from '@fluentui/react'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './BasePanel.module.scss'
import { IBasePanelProps } from './types'
import { useBasePanel } from './useBasePanel'

/**
 * Renders a Panel with the content wrapped in `<FluentProvider />` from
 * [@fluentui/react-components](@fluentui/react-components)
 *
 * @category Reusable Component
 */
export const BasePanel: ReusableComponent<IBasePanelProps> = (props) => {
  const panelProps = useBasePanel(props)
  return (
    <Panel {...panelProps}>
      <FluentProvider theme={webLightTheme} className={styles.root}>
        {props.children}
      </FluentProvider>
    </Panel>
  )
}

BasePanel.defaultProps = {
  headerActions: [],
  footerActions: [],
  isLightDismiss: true
}
