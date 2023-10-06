import { mergeClasses } from '@fluentui/react-components'
import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './Footer.module.scss'
import { IFooterProps } from './types'
import { useFooter } from './useFooter'

export const Footer: StyledComponent<IFooterProps> = (props) => {
  const actions = useFooter(props)
  return (
    <div
      className={mergeClasses(
        Footer.className,
        props.className,
        props.sticky && styles.isSticky,
        props.bordered && styles.hasBorder
      )}
      hidden={props.hidden}
    >
      <div
        className={mergeClasses(
          styles.footerInner,
          props.padded && styles.padded
        )}
      >
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <DynamicButton key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  )
}

Footer.displayName = 'Footer'
Footer.className = styles.footer
Footer.defaultProps = {
  actions: [],
  cancelAction: false
}
