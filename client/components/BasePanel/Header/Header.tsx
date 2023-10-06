import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './Header.module.scss'
import { IHeaderProps } from './types'

export const Header: StyledComponent<IHeaderProps> = ({ actions }) => {
  return (
    <div className={Header.className}>
      <div className={styles.actions}>
        {actions.map((action) => (
          <DynamicButton key={action.text} {...action} />
        ))}
      </div>
    </div>
  )
}

Header.displayName = 'Header'
Header.className = styles.header
Header.defaultProps = {
  actions: []
}
