import { UserMessage } from 'components/UserMessage'
import { Panel } from 'office-ui-fabric'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { INotificationsPanelProps } from './types'
import { UserNotification } from './UserNotification'
import styles from './UserNotificationsPanel.module.scss'

export const NotificationsPanel = ({
  isOpen,
  onDismiss,
  notifications
}: INotificationsPanelProps) => {
  const { t } = useTranslation()
  return (
    <Panel
      isOpen={isOpen}
      className={styles.root}
      headerText={t('notifications.headerText')}
      onDismiss={onDismiss}
      isLightDismiss={true}>
      <div className={styles.body}>
        <div hidden={!isEmpty(notifications)}>
          <UserMessage text={t('notifications.emptyText')} />
        </div>
        <div hidden={isEmpty(notifications)}>
          {...notifications.map((n, idx) => (
            <UserNotification key={idx} model={n} />
          ))}
        </div>
      </div>
    </Panel>
  )
}
