/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React, { FC } from 'react'
import { omit } from 'underscore'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline `<Icon />` with text
 *
 * @category Function Component
 */
export const IconText: FC<IIconTextProps> = (props) => {
  return (
    <div className={styles.root}>
      <Icon {...omit(props, 'text')} iconName={props.iconName || 'Page'} />
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}
