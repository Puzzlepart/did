/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { omit } from 'underscore'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline `<Icon />` with text
 *
 * @category Function Component
 */
export const IconText: FunctionComponent<IIconTextProps> = (
  props: IIconTextProps
) => {
  return (
    <div className={styles.root}>
      <Icon {...omit(props, 'text')} />
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}
