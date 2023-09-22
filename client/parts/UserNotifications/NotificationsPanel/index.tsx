/* eslint-disable tsdoc/syntax */
import { IPanelProps } from '@fluentui/react'
import { BasePanel } from 'components'
import { UserMessage, UserMessageContainer } from 'components/UserMessage'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationsPanel.module.scss'
import { UserNotification } from './UserNotification'

/**
 * @category Function Component
 */
export const NotificationsPanel: StyledComponent<IPanelProps> = (props) => {
  const { t } = useTranslation()
  const { notifications, dismissedCount, clearDismissed } = useContext(
    UserNotificationsContext
  )
  return (
    <BasePanel
      {...props}
      className={NotificationsPanel.className}
      headerText={t('notifications.headerText')}
      isLightDismiss={true}
    >
      <div className={styles.body}>
        <div hidden={!_.isEmpty(notifications)}>
          <UserMessage
            text={t('notifications.emptyText', { dismissedCount })}
            action={
              dismissedCount > 0 && {
                text: t('notifications.clearDismissedText'),
                onClick: clearDismissed
              }
            }
          />
        </div>
        <UserMessageContainer vertical gap={12}>
          {...notifications.map((n, index) => (
            <UserNotification key={index} model={n} />
          ))}
        </UserMessageContainer>
      </div>
    </BasePanel>
  )
}

NotificationsPanel.displayName = 'NotificationsPanel'
NotificationsPanel.className = styles.notificationsPanel

export * from './types'
export * from './UserNotification'
