/* eslint-disable tsdoc/syntax */
import { Link, Panel } from '@fluentui/react'
import { UserMessage } from 'components/UserMessage'
import React, { useContext, useDebugValue } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { UserNotificationsContext } from '../context'
import { UserNotification } from './UserNotification'
import styles from './UserNotificationsPanel.module.scss'

/**
 * @category Function Component
 */
export const NotificationsPanel: React.FC = () => {
  const { t } = useTranslation()
  const {
    notifications,
    panelOpen,
    dismissPanel,
    dismissedCount,
    clearDismissed
  } = useContext(UserNotificationsContext)
  useDebugValue({ dismissedCount })
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
              <div hidden={dismissedCount === 0}>
                <Link onClick={clearDismissed}>
                  {t('notifications.clearDismissedText')}
                </Link>
              </div>
            }
          />
        </div>
        <div>
          {...notifications.map((n, index) => (
            <UserNotification key={index} model={n} />
          ))}
        </div>
      </div>
    </Panel>
  )
}

export * from './types'
export * from './UserNotification'
