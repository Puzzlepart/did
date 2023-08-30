/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import React, { FC, useContext } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { UserNotificationsContext } from '../../context'
import styles from './UserNotificationMessage.module.scss'
import { IUserNotificationProps } from './types'

/**
 * @category Function Component
 */
export const UserNotification: FC<IUserNotificationProps> = ({model}) => {
  const { t } = useTranslation()
  const { dismissNotification } = useContext(UserNotificationsContext)
  return (
    <FadeIn>
      <UserMessage
        {...model.alertProps}
        className={styles.root}
        onDismiss={() => dismissNotification(model.id)}
        actions={[
          {
            content: model.getMoreLinkText(t),
            onClick: () => window.open(model.moreLink)
          }
        ]}
      >
        <span className={styles.text}>{model.text}</span>
      </UserMessage>
    </FadeIn>
  )
}

export * from './types'
