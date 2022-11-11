/* eslint-disable tsdoc/syntax */
import { Link } from '@fluentui/react'
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
export const UserNotification: FC<IUserNotificationProps> = ({
  model
}: IUserNotificationProps) => {
  const { t } = useTranslation()
  const { dismissNotification } = useContext(UserNotificationsContext)
  return (
    <FadeIn>
      <UserMessage
        {...model.messageProps}
        className={styles.root}
        onDismiss={() => dismissNotification(model.id)}
        styles={{ actions: { flexDirection: 'row', paddingLeft: 28 } }}
        actions={<Link href={model.moreLink}>{model.getMoreLinkText(t)}</Link>}
      >
        <span className={styles.text}>{model.text}</span>
      </UserMessage>
    </FadeIn>
  )
}

export * from './types'
