import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BasePanel.module.scss'
import { PanelAction } from './PanelAction'
import { IBasePanelAction, IFooterProps } from './types'

export const Footer: FC<IFooterProps> = (props) => {
  const { t } = useTranslation()
  const actions = [
    ...props.actions,
    {
      text: t('common.cancelButtonLabel'),
      appearance: 'subtle',
      onClick: props.onDismiss
    } as IBasePanelAction
  ]
  return (
    <FluentProvider theme={webLightTheme} className={styles.footer}>
      <div className={styles.actions}>
        {actions.map((action, index) => (
          <PanelAction key={index} {...action} />
        ))}
      </div>
    </FluentProvider>
  )
}

Footer.defaultProps = {
  actions: []
}
