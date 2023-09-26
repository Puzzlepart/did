import { Panel } from '@fluentui/react'
import { Text } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import styles from './BasePanel.module.scss'
import { IBasePanelProps } from './types'
import { useBasePanel } from './useBasePanel'

/**
 * @category Reusable Component
 */
export const BasePanel: ReusableComponent<IBasePanelProps> = (props) => {
  const panelProps = useBasePanel(props)
  return (
    <Panel {...panelProps}>
        {props.headerSubText && (
          <Text {...props.headerSubTextProps} className={styles.headerSubText}>
            {props.headerSubText}
          </Text>
        )}
        {props.children}
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
