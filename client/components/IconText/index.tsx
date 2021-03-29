/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _  from 'underscore'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline `<Icon />` with text
 *
 * @category Reusable Component
 */
export const IconText: ReusableComponent<IIconTextProps> = (props) => {
  return (
    <div className={styles.root}>
      <Icon {..._.omit(props, 'text')} iconName={props.iconName || 'Page'} />
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}
