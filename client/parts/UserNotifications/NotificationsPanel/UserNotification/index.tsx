/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import React, { FC, useContext } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { UserNotificationsContext } from '../../context'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'

/**
 * @category Function Component
 */
export const UserNotification: FC<IUserNotificationProps> = ({ model }) => {
  const { t } = useTranslation()
  const { dismissNotification } = useContext(UserNotificationsContext)
  return (
    <FadeIn>
      <UserMessage
        {...model.alertProps}
        className={styles.root}
        actions={[
          {
            content: model.getMoreLinkText(t),
            onClick: () => window.open(model.moreLink, '_self'),
            iconName: 'CalendarPlay'
          },
          {
            content: t('notifications.dismissText'),
            onClick: () => dismissNotification(model.id),
            iconName: 'DeleteDismiss',
            iconColor: 'var(--colorPaletteRedForeground1)'
          }
        ]}
      >
        <span className={styles.text}>{model.text}</span>
      </UserMessage>
    </FadeIn>
  )
}

export * from './types'
