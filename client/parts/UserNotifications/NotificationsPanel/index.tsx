/* eslint-disable tsdoc/syntax */
import { IPanelProps } from '@fluentui/react'
import { BasePanel } from 'components'
import { UserMessage, UserMessageContainer } from 'components/UserMessage'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import { UserNotification } from './UserNotification'
import styles from './UserNotificationsPanel.module.scss'

/**
 * @category Function Component
 */
export const NotificationsPanel: FC<IPanelProps> = (props) => {
  const { t } = useTranslation()
  const { notifications, dismissedCount, clearDismissed } = useContext(
    UserNotificationsContext
  )
  return (
    <BasePanel
      {...props}
      className={styles.root}
      headerText={t('notifications.headerText')}
      isLightDismiss={true}
    >
      <div className={styles.body}>
        <div hidden={!_.isEmpty(notifications)}>
          <UserMessage
            text={t('notifications.emptyText', { dismissedCount })}
            actions={
              dismissedCount > 0
                ? [
                    {
                      content: t('notifications.clearDismissedText'),
                      onClick: clearDismissed
                    }
                  ]
                : []
            }
          />
        </div>
        <UserMessageContainer vertical>
          {...notifications.map((n, index) => (
            <UserNotification key={index} model={n} />
          ))}
        </UserMessageContainer>
      </div>
    </BasePanel>
  )
}

export * from './types'
export * from './UserNotification'
