/* eslint-disable tsdoc/syntax */
import { Link, MessageBar } from 'office-ui-fabric-react'
import React, { useContext } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { UserNotificationsContext } from '../../context'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'

/**
 * @category Function Component
 */
export const UserNotification: React.FC<IUserNotificationProps> = ({
  model
}: IUserNotificationProps) => {
  const { t } = useTranslation()
  const { dismissNotification } = useContext(UserNotificationsContext)
  return (
    <FadeIn>
      <MessageBar
        {...model.messageProps}
        onDismiss={() => dismissNotification(model.id)}
        className={styles.root}
        styles={{ actions: { flexDirection: 'row', paddingLeft: 28 } }}
        actions={<Link href={model.moreLink}>{model.getMoreLinkText(t)}</Link>}>
        <span className={styles.text}>{model.text}</span>
      </MessageBar>
    </FadeIn>
  )
}

export * from './types'
