import { UserNotificationsContext } from 'components/UserNotifications/context'
import { Link, MessageBar } from 'office-ui-fabric'
import * as React from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'

export const UserNotification = ({ model }: IUserNotificationProps) => {
  const { t } = useTranslation()
  const { dismissNotification } = React.useContext(UserNotificationsContext)
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
