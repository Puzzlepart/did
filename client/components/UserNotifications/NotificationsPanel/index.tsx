import { UserMessage } from 'components/UserMessage'
import { Link, Panel } from 'office-ui-fabric'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { UserNotificationsContext } from '../context'
import { UserNotification } from './UserNotification'
import styles from './UserNotificationsPanel.module.scss'

export const NotificationsPanel: FunctionComponent = () => {
  const { t } = useTranslation()
  const {
    notifications,
    panelOpen,
    dismissPanel,
    dismissedCount,
    clearDismissed
  } = useContext(UserNotificationsContext)
  return (
    <Panel
      isOpen={panelOpen}
      className={styles.root}
      headerText={t('notifications.headerText')}
      onDismiss={dismissPanel}
      isLightDismiss={true}>
      <div className={styles.body}>
        <div hidden={!isEmpty(notifications)}>
          <UserMessage
            text={t('notifications.emptyText', { dismissedCount })}
            actions={
              <Link onClick={clearDismissed}>
                {t('notifications.clearDismissedText')}
              </Link>
            }
          />
        </div>
        <div>
          {...notifications.map((n, idx) => (
            <UserNotification key={idx} model={n} />
          ))}
        </div>
      </div>
    </Panel>
  )
}
