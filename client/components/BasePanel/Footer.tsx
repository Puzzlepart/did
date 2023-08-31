import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React, { FC } from 'react'
import styles from './BasePanel.module.scss'
import { PanelAction } from './PanelAction'
import { IFooterProps } from './types'

export const Footer: FC<IFooterProps> = (props) => {
  return (
    <FluentProvider theme={webLightTheme} className={styles.footer}>
      <div className={styles.actions}>
        {props.actions.map((action, index) => (
          <PanelAction key={index} {...action} />
        ))}
      </div>
    </FluentProvider>
  )
}

Footer.defaultProps = {
  actions: []
}
