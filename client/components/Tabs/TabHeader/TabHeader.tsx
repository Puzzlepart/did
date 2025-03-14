import { Caption2 } from '@fluentui/react-text'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './TabHeader.module.scss'
import { ITabHeaderProps } from './types'
import { mergeClasses } from '@fluentui/react-components'

export const TabHeader: StyledComponent<ITabHeaderProps> = (props) => {
  return (
    <div
      className={mergeClasses(
        TabHeader.className,
        props.indent && styles.indent
      )}
    >
      <div className={styles.text}>{props.text}</div>
      <Caption2 align='start' className={styles.description}>
        {props.description}
      </Caption2>
    </div>
  )
}

TabHeader.displayName = 'TabHeader'
TabHeader.className = styles.tabHeader
TabHeader.defaultProps = {
  sub: {}
}
