import { FluentProvider } from '@fluentui/react-components'
import React, { FC } from 'react'
import { fluentLightTheme } from 'theme'
import styles from './BasePanel.module.scss'
import { PanelAction } from './PanelAction'
import { IHeaderProps } from './types'

export const Header: FC<IHeaderProps> = (props) => {
  return (
    <FluentProvider theme={fluentLightTheme} className={styles.header}>
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
