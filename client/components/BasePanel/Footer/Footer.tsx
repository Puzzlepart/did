import { FluentProvider } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { fluentLightTheme } from 'theme'
import { PanelAction } from '../PanelAction'
import { IBasePanelAction } from '../types'
import styles from './Footer.module.scss'
import { IFooterProps } from './types'

export const Footer: FC<IFooterProps> = (props) => {
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
      className={styles.footer}
      hidden={props.hidden}
    >
      <div className={styles.footerInner}>
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <PanelAction key={index} {...action} />
          ))}
        </div>
      </div>
    </FluentProvider>
  )
}

Footer.defaultProps = {
  actions: [],
  cancelAction: false
}
