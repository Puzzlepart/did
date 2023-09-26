import { Panel } from '@fluentui/react'
import { Text } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Themed } from 'theme'
import styles from './BasePanel.module.scss'
import { IBasePanelProps } from './types'
import { useBasePanel } from './useBasePanel'

/**
 * Renders a Panel with the content wrapped in our `<Themed>` component.
 *
 * @category Reusable Component
 */
export const BasePanel: ReusableComponent<IBasePanelProps> = (props) => {
  const panelProps = useBasePanel(props)
  return (
    <Panel {...panelProps}>
      <Themed>
        {props.headerSubText && (
          <Text {...props.headerSubTextProps} className={styles.headerSubText}>
            {props.headerSubText}
          </Text>
        )}
        {props.children}
      </Themed>
    </Panel>
  )
}

BasePanel.displayName = 'BasePanel'
BasePanel.className = styles.basePanel
BasePanel.defaultProps = {
  headerActions: [],
  footerActions: [],
  isLightDismiss: true,
  scroll: false,
  headerSubTextProps: {
    size: 400,
    block: true
  }
}
