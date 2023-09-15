import { FluentProvider } from '@fluentui/react-components'
import { css } from '@fluentui/utilities'
import { DynamicButton } from 'components/DynamicButton'
import React from 'react'
import { fluentLightTheme } from 'theme'
import { StyledComponent } from 'types'
import styles from './Footer.module.scss'
import { IFooterProps } from './types'
import { useFooter } from './useFooter'

export const Footer: StyledComponent<IFooterProps> = (props) => {
  const actions = useFooter(props)
  return (
    <FluentProvider
      theme={fluentLightTheme}
      className={css(
        Footer.className,
        props.className,
        props.sticky && styles.isSticky,
        props.bordered && styles.hasBorder
      )}
      hidden={props.hidden}
    >
      <div className={css(styles.footerInner, props.padded && styles.padded)}>
        <div className={styles.actions}>
          {actions.map((action) => (
            <DynamicButton key={action.text} {...action} />
          ))}
        </div>
      </div>
    </FluentProvider>
  )
}

Footer.displayName = 'Footer'
Footer.className = styles.footer
Footer.defaultProps = {
  actions: [],
  cancelAction: false
}
