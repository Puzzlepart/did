/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React from 'react'
import { omit } from 'underscore'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline `<Icon />` with text
 *
 * @category Function Component
 */
export const IconText: React.FC<IIconTextProps> = (props) => {
  return (
    <div className={styles.root}>
      <Icon {...omit(props, 'text')} iconName={props.iconName || 'Page'} />
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}
