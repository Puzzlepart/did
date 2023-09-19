import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import _ from 'underscore'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline `<Icon />` with text
 *
 * @category Reusable Component
 */
export const IconText: ReusableComponent<IIconTextProps> = (props) => {
  return (
    <div className={IconText.className}>
      <Icon {..._.omit(props, 'text')} iconName={props.iconName} />
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}

IconText.displayName = 'IconText'
IconText.className = styles.iconText
IconText.defaultProps = {
  iconName: 'Page'
}
