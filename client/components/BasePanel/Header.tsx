import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React, { FC } from 'react'
import styles from './BasePanel.module.scss'
import { PanelAction } from './PanelAction'
import { IHeaderProps } from './types'

export const Header: FC<IHeaderProps> = (props) => {
  return (
    <FluentProvider theme={webLightTheme} className={styles.header}>
      <div className={styles.actions}>
        {props.actions.map((action, index) => (
          <PanelAction key={index} {...action} />
        ))}
      </div>
    </FluentProvider>
  )
}

Header.defaultProps = {
  actions: []
}
