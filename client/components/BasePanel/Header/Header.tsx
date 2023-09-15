import { FluentProvider } from '@fluentui/react-components'
import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { fluentLightTheme } from 'theme'
import { StyledComponent } from 'types'
import styles from './Header.module.scss'
import { IHeaderProps } from './types'

export const Header: StyledComponent<IHeaderProps> = ({ actions }) => {
  return (
    <FluentProvider theme={fluentLightTheme} className={Header.className}>
      <div className={styles.actions}>
        {actions.map((action) => (
          <DynamicButton key={action.text} {...action} />
        ))}
      </div>
    </FluentProvider>
  )
}

Header.displayName = 'Header'
Header.className = styles.header
Header.defaultProps = {
  actions: []
}
