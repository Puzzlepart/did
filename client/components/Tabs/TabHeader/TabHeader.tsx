import { Caption2 } from '@fluentui/react-text'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './TabHeader.module.scss'
import { ITabHeaderProps } from './types'

export const TabHeader: StyledComponent<ITabHeaderProps> = (props) => {
  return (
    <div className={TabHeader.className}>
      <div> {props.text}</div>
      <Caption2 align='start'>{props.description}</Caption2>
    </div>
  )
}

TabHeader.displayName = 'TabHeader'
TabHeader.className = styles.tabHeader
TabHeader.defaultProps = {}
