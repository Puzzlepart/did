import { ReusableComponent } from 'components/types'
import React from 'react'
import { getFluentIconWithFallback } from 'utils/getFluentIcon'
import styles from './IconText.module.scss'
import { IIconTextProps } from './types'

/**
 * Renders an inline icon with text using Fluent UI v9 icons
 *
 * @category Reusable Component
 */
export const IconText: ReusableComponent<IIconTextProps> = (props) => {
  return (
    <div className={IconText.className}>
      {getFluentIconWithFallback(props.iconName, {
        color: props.styles?.root?.color as string,
        size: props.styles?.root?.fontSize
      })}
      <span style={{ marginLeft: 6, verticalAlign: 'top' }}>{props.text}</span>
    </div>
  )
}

IconText.displayName = 'IconText'
IconText.className = styles.iconText
IconText.defaultProps = {
  iconName: 'Page'
}
