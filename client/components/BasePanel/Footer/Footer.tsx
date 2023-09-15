import { FluentProvider } from '@fluentui/react-components'
import { css } from '@fluentui/utilities'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { fluentLightTheme } from 'theme'
import { StyledComponent } from 'types'
import { PanelAction } from '../PanelAction'
import { IBasePanelAction } from '../types'
import styles from './Footer.module.scss'
import { IFooterProps } from './types'

export const Footer: StyledComponent<IFooterProps> = (props) => {
  const { t } = useTranslation()
  const actions = [
    ...props.actions,
    props.cancelAction &&
      ({
        text: t('common.cancelButtonLabel'),
        appearance: 'subtle',
        onClick: props.onDismiss
      } as IBasePanelAction)
  ].filter(Boolean)
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
          {actions.map((action, index) => (
            <PanelAction key={index} {...action} />
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
